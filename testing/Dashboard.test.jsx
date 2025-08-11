import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Dashboard from '../src/components/Dashboard'
import { fetchNews } from '../src/api/newsApi'
import userEvent from '@testing-library/user-event'
import { beforeEach, vi } from 'vitest'

// fetchNews test
vi.mock('../src/api/newsApi', () => ({
  fetchNews: vi.fn(),
}))

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('Ladesymbol und dann News anzeigen', async () => {
    fetchNews.mockResolvedValueOnce([
      {
        id: 1,
        title: 'Test News',
        url: 'http://abc.com',
        summary: 'TestTestTest',
        published_at: '2025-01-11T00:00:00Z',
      },
    ])

    render(<Dashboard />)

    // Button zeigt Laden
    expect(screen.getByRole('button', { name: /loading/i })).toBeDisabled()

    // News wird angezeigt
    expect(await screen.findByText('Test News')).toBeInTheDocument()
    expect(screen.getByText('TestTestTest')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Test News' })).toHaveAttribute(
      'href',
      'http://abc.com'
    )

    // Button wieder auf refresh
    expect(screen.getByRole('button', { name: /refresh/i })).toBeEnabled()
  })

  it('zeigt Fehlermeldung, wenn fetchNews fehlschlägt', async () => {
    fetchNews.mockRejectedValueOnce(new Error('API Fehler'))

    render(<Dashboard />)

    // Fehlermeldung wird angezeigt
    expect(
      await screen.findByText(/fehler beim laden der news/i)
    ).toBeInTheDocument()
  })

  it('lädt erneut beim Klick auf Refresh', async () => {
    // Erster Fetch: keine News
    fetchNews.mockResolvedValueOnce([])

    render(<Dashboard />)

    await waitFor(() => expect(fetchNews).toHaveBeenCalledTimes(1))

    // Zweiter Fetch: neue News
    fetchNews.mockResolvedValueOnce([
      {
        id: 2,
        title: 'Neue News',
        url: 'http://example.com/2',
        summary: 'Neue Zusammenfassung',
        published_at: '2025-08-11T00:00:00Z',
      },
    ])

    await userEvent.click(screen.getByRole('button', { name: /refresh/i }))

    expect(await screen.findByText('Neue News')).toBeInTheDocument()
    expect(fetchNews).toHaveBeenCalledTimes(2)
  })
})
