import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAuth } from '../useAuth'

describe('useAuth', () => {
  it('should return context value', () => {
    const { result } = renderHook(() => useAuth())

    expect(result.current).toBeDefined()
    expect(result.current.isAuthenticated).toBeDefined()
    expect(result.current.userProfile).toBeDefined()
  })

  it('should have required methods', () => {
    const { result } = renderHook(() => useAuth())

    expect(typeof result.current.signin).toBe('function')
    expect(typeof result.current.signup).toBe('function')
    expect(typeof result.current.logout).toBe('function')
  })
})

