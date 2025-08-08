import React, { useEffect, useState } from 'react'
import { fetchNews } from '../api/newsApi'

export default function Dashboard() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)

  async function loadNews() {
    setLoading(true)
    const data = await fetchNews()
    setNews(data)
    setLoading(false)
  }

  useEffect(() => {
    loadNews()
  }, [])

  return (
    <div>
      <h1>Top News</h1>
      <button onClick={loadNews} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh'}
      </button>
      <ul>
        {news.map(({ title, url }, i) => (
          <li key={i}>
            <a href={url} target="_blank">
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
