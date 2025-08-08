import React, { useEffect, useState } from 'react'
import { fetchNews } from '../api/newsApi'

export default function Dashboard() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function loadNews() {
    setLoading(true)
    try {
      const data = await fetchNews()
      setNews(data.results)
    } catch (error) {
      setError('Fehler beim Laden der News')
    }
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
        {news.map((item) => (
          <li key={item.id} style={{ marginBottom: '20px' }}>
            <a href={item.url} style={{ fontWeight: 'bold', fontSize: '18px' }}>
              {item.title}
            </a>
            <p>{item.summary}</p>
            <p>
              Published at: {new Date(item.published_at).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
