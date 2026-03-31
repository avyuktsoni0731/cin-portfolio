/**
 * GitHub GraphQL: contribution calendar (same data as the profile heatmap).
 * Requires GITHUB_TOKEN + GITHUB_USERNAME in env (server-only).
 *
 * Default: last ~365 days (rolling), like github.com profile.
 * Set GITHUB_ACTIVITY_YEAR=2026 to pin a calendar year instead.
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
  /** 'rolling' = last ~365 days; 'calendar_year' = Jan 1–Dec 31 */
  periodMode: 'rolling' | 'calendar_year'
  /** e.g. "last ~365 days" or "2026" */
  periodLabel: string
  totalContributions: number
  weeks: ContributionDayCell[][]
  maxCount: number
}

export function countToLevel(count: number, max: number): 0 | 1 | 2 | 3 {
  if (count === 0) return 0
  if (max <= 1) return 3
  const r = count / max
  if (r <= 0.33) return 1
  if (r <= 0.66) return 2
  return 3
}

/**
 * Keep only the latest `maxWeeks` columns (GitHub orders weeks oldest → newest).
 * Recomputes intensity levels from the visible slice so the legend matches the frame.
 */
export function sliceLatestWeeks(
  weeks: ContributionDayCell[][],
  maxWeeks: number
): ContributionDayCell[][] {
  const sliced = weeks.slice(-maxWeeks)
  let maxCount = 0
  for (const w of sliced) {
    for (const d of w) {
      if (d.contributionCount > maxCount) maxCount = d.contributionCount
    }
  }
  return sliced.map((week) =>
    week.map((d) => ({
      ...d,
      level: countToLevel(d.contributionCount, maxCount),
    }))
  )
}

function rolling365Range(): { fromIso: string; toIso: string } {
  const end = new Date()
  const start = new Date(end.getTime() - 364 * 24 * 60 * 60 * 1000)
  return { fromIso: start.toISOString(), toIso: end.toISOString() }
}

export async function getGithubContributionCalendar(): Promise<ContributionCalendarResult | null> {
  const login = process.env.GITHUB_USERNAME?.trim()
  const token = process.env.GITHUB_TOKEN?.trim()
  const envYear = process.env.GITHUB_ACTIVITY_YEAR?.trim()
  const parsedEnvYear = envYear ? parseInt(envYear, 10) : NaN
  const useCalendarYear = !Number.isNaN(parsedEnvYear)

  if (!login || !token) {
    return null
  }

  let fromIso: string
  let toIso: string
  let periodMode: 'rolling' | 'calendar_year'
  let periodLabel: string

  if (useCalendarYear) {
    const y = parsedEnvYear
    fromIso = `${y}-01-01T00:00:00Z`
    toIso = `${y}-12-31T23:59:59Z`
    periodMode = 'calendar_year'
    periodLabel = String(y)
  } else {
    const r = rolling365Range()
    fromIso = r.fromIso
    toIso = r.toIso
    periodMode = 'rolling'
    periodLabel = 'last ~365 days'
  }

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
      periodMode,
      periodLabel,
      totalContributions: cal.totalContributions,
      weeks,
      maxCount,
    }
  } catch (e) {
    console.error('[github] fetch failed', e)
    return null
  }
}
