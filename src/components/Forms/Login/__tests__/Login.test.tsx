import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@/__tests__/setup/test-utils'
import { LoginForm } from '../index'

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    signin: vi.fn(),
  }),
}))

vi.mock('@/utils/toast', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

describe('LoginForm Component', () => {
  it('should render login form', () => {
    render(<LoginForm />)
    
    expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument()
  })

  it('should have email input', () => {
    render(<LoginForm />)
    
    const emailInput = screen.getByPlaceholderText(/e-mail/i)
    expect(emailInput).toBeInTheDocument()
  })

  it('should have password input', () => {
    render(<LoginForm />)
    
    const passwordInput = screen.getByPlaceholderText(/senha/i)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('should have submit button', () => {
    render(<LoginForm />)
    
    const submitButton = screen.getByRole('button', { name: /entrar/i })
    expect(submitButton).toBeInTheDocument()
  })

  it('should allow typing in email field', () => {
    render(<LoginForm />)
    
    const emailInput = screen.getByPlaceholderText(/e-mail/i) as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    
    expect(emailInput.value).toBe('test@example.com')
  })

  it('should allow typing in password field', () => {
    render(<LoginForm />)
    
    const passwordInput = screen.getByPlaceholderText(/senha/i) as HTMLInputElement
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    
    expect(passwordInput.value).toBe('password123')
  })
})

