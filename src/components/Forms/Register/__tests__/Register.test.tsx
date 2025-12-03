import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@/__tests__/setup/test-utils'
import { RegisterForm } from '../index'

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    signup: vi.fn(),
  }),
}))

vi.mock('@/utils/toast', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

describe('RegisterForm Component', () => {
  it('should render registration form', () => {
    const { container } = render(<RegisterForm />)
    
    expect(container.querySelector('form')).toBeInTheDocument()
  })

  it('should have username input', () => {
    render(<RegisterForm />)
    
    const usernameInput = screen.getByLabelText(/nome de usuario/i)
    expect(usernameInput).toBeInTheDocument()
  })

  it('should have email input', () => {
    render(<RegisterForm />)
    
    const emailInput = screen.getByLabelText(/e-mail/i)
    expect(emailInput).toBeInTheDocument()
  })

  it('should have password input', () => {
    render(<RegisterForm />)
    
    const passwordLabel = screen.getByLabelText(/^senha$/i)
    expect(passwordLabel).toBeInTheDocument()
  })

  it('should have submit button', () => {
    render(<RegisterForm />)
    
    const submitButton = screen.getByRole('button')
    expect(submitButton).toBeInTheDocument()
  })

  it('should allow typing in username field', () => {
    render(<RegisterForm />)
    
    const usernameInput = screen.getByLabelText(/nome de usuario/i) as HTMLInputElement
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } })
    
    expect(usernameInput.value).toBe('johndoe')
  })

  it('should allow typing in email field', () => {
    render(<RegisterForm />)
    
    const emailInput = screen.getByLabelText(/e-mail/i) as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    
    expect(emailInput.value).toBe('test@example.com')
  })
})

