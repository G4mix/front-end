import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMediaQuery } from '../useMediaQuery'

interface MatchMediaMock {
  matches: boolean
  media: string
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
}

describe('useMediaQuery', () => {
  let matchMediaMock: MatchMediaMock

  beforeEach(() => {
    matchMediaMock = {
      matches: false,
      media: '',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn().mockImplementation((query) => {
        matchMediaMock.media = query
        return matchMediaMock
      }),
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return false initially when media query does not match', () => {
    matchMediaMock.matches = false
    
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    
    expect(result.current).toBe(false)
  })

  it('should return true initially when media query matches', () => {
    matchMediaMock.matches = true
    
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    
    expect(result.current).toBe(true)
  })

  it('should update when media query changes', () => {
    matchMediaMock.matches = false
    
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    
    expect(result.current).toBe(false)
    
    act(() => {
      matchMediaMock.matches = true
      const listener = matchMediaMock.addEventListener.mock.calls[0][1]
      listener({ matches: true })
    })
    
    expect(result.current).toBe(true)
  })

  it('should register event listener on mount', () => {
    renderHook(() => useMediaQuery('(min-width: 768px)'))
    
    expect(matchMediaMock.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    )
  })

  it('should cleanup event listener on unmount', () => {
    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    
    unmount()
    
    expect(matchMediaMock.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    )
  })

  it('should handle different media queries', () => {
    const queries = [
      '(min-width: 768px)',
      '(max-width: 1024px)',
      '(orientation: portrait)',
      'print',
    ]

    queries.forEach((query) => {
      renderHook(() => useMediaQuery(query))
      expect(window.matchMedia).toHaveBeenCalledWith(query)
    })
  })

  it('should update when query prop changes', () => {
    const { rerender } = renderHook(
      ({ query }) => useMediaQuery(query),
      { initialProps: { query: '(min-width: 768px)' } }
    )

    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 768px)')

    rerender({ query: '(min-width: 1024px)' })

    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 1024px)')
  })

  it('should handle multiple instances independently', () => {
    const { result: result1 } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    const { result: result2 } = renderHook(() => useMediaQuery('(min-width: 1024px)'))

    expect(result1.current).toBeDefined()
    expect(result2.current).toBeDefined()
  })
})

