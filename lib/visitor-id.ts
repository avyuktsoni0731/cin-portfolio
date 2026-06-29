const STORAGE_KEY = 'cin-portfolio-visitor-id'

export function getVisitorId(): string {
  if (typeof window === 'undefined') return ''

  let id = localStorage.getItem(STORAGE_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(STORAGE_KEY, id)
  }
  return id
}

export function getStoredAuthorName(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem('cin-portfolio-author-name') ?? ''
}

export function setStoredAuthorName(name: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('cin-portfolio-author-name', name)
}
