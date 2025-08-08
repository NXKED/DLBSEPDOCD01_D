export async function fetchNews() {
  const response = await fetch(
    'https://api.spaceflightnewsapi.net/v4/articles?_limit=5&_sort=publishedAt:desc'
  )
  if (!response.ok) {
    throw new Error('Failed to fetch News')
  }
  const data = await response.json()
  return data.map(({ title, url }) => ({ title, url }))
}
