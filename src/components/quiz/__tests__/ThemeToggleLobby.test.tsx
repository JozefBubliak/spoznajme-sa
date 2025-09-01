import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, it, expect, jest, beforeAll } from '@jest/globals'
import ThemeToggle from '@/components/ThemeToggle'
import JoinGameWaitingRoom from '@/components/quiz/JoinGameWaitingRoom'

function TestPage() {
  const [locked, setLocked] = useState(false)
  return (
    <>
      <div data-testid="theme-wrapper">
        <ThemeToggle />
      </div>
      {locked ? (
        <div data-testid="locked">locked</div>
      ) : (
        <JoinGameWaitingRoom code="abc" players={[]} onLock={() => setLocked(true)} />
      )}
    </>
  )
}

describe('ThemeToggle', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  it('keeps dark theme after lobby lock', async () => {
    const user = userEvent.setup()
    render(<TestPage />)

    const toggleBtn = within(screen.getByTestId('theme-wrapper')).getByRole('button')
    await user.click(toggleBtn)
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    await user.click(screen.getByRole('button', { name: /zamknúť lobby/i }))
    expect(screen.getByTestId('locked')).toBeInTheDocument()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
