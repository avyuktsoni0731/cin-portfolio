/**
 * GitHub GraphQL: contribution calendar for a user (same data as the profile heatmap).
 * Requires GITHUB_TOKEN + GITHUB_USERNAME in env (server-only; never expose the token).
 */

type GraphQLResponse = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: Array<{
            contributionDays: Array<{
              date: string
              contributionCount: number
              weekday: number
            }>
          }>
        }
      } | null
    } | null
  }
  errors?: Array<{ message: string }>
}

const QUERY = `
  query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
            }
          }
        }
      }
    }
  }
`

export type ContributionDayCell = {
  date: string
  contributionCount: number
  weekday: number
  level: 0 | 1 | 2 | 3
}

export type ContributionCalendarResult = {
  login: string
  year: number
  totalContributions: number
  /** Columns = weeks (Sun→Sat rows), same order as github.com */
  weeks: ContributionDayCell[][]
  maxCount: number
}

function countToLevel(count: number, max: number): 0 | 1 | 2 | 3 {
  if (count === 0) return 0
  if (max <= 1) return 3
  const r = count / max
  if (r <= 0.33) return 1
  if (r <= 0.66) return 2
  return 3
}

export async function getGithubContributionCalendar(
  year?: number
): Promise<ContributionCalendarResult | null> {
  const login = process.env.GITHUB_USERNAME?.trim()
  const token = process.env.GITHUB_TOKEN?.trim()
  const envYear = process.env.GITHUB_ACTIVITY_YEAR?.trim()
  const parsedEnvYear = envYear ? parseInt(envYear, 10) : NaN
  const y =
    year ??
    (!Number.isNaN(parsedEnvYear) ? parsedEnvYear : new Date().getFullYear())

  if (!login || !token) {
    return null
  }

  const fromIso = `${y}-01-01T00:00:00Z`
  const toIso = `${y}-12-31T23:59:59Z`

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login, from: fromIso, to: toIso },
      }),
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      console.error('[github] graphql http', res.status)
      return null
    }

    const json = (await res.json()) as GraphQLResponse

    if (json.errors?.length) {
      console.error('[github] graphql', json.errors.map((e) => e.message).join('; '))
      return null
    }

    const user = json.data?.user
    if (!user) {
      console.error('[github] user not found for login', login)
      return null
    }

    const cal = user.contributionsCollection?.contributionCalendar
    if (!cal?.weeks?.length) {
      return null
    }

    let maxCount = 0
    for (const w of cal.weeks) {
      for (const d of w.contributionDays) {
        if (d.contributionCount > maxCount) maxCount = d.contributionCount
      }
    }

    const weeks: ContributionDayCell[][] = cal.weeks.map((w) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        contributionCount: d.contributionCount,
        weekday: d.weekday,
        level: countToLevel(d.contributionCount, maxCount),
      }))
    )

    return {
      login,
      year: y,
      totalContributions: cal.totalContributions,
      weeks,
      maxCount,
    }
  } catch (e) {
    console.error('[github] fetch failed', e)
    return null
  }
}
