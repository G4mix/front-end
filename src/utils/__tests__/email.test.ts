import { describe, it, expect } from 'vitest'
import { isValidEmail, emailRegex } from '../email'

describe('email validation', () => {
  describe('isValidEmail', () => {
    it('should accept valid email addresses', () => {
      const validEmails = [
        'user@example.com',
        'test.user@example.com',
        'user+tag@example.co.uk',
        'user123@test-domain.com',
        'first.last@subdomain.example.com',
        'user_name@example.com',
        '123@example.com',
      ]

      validEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(true)
      })
    })

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        '',
        'notanemail',
        '@example.com',
        'user@',
        'user @example.com',
        'user@.com',
        'user@example',
        'user name@example.com',
        'user@exam ple.com',
      ]

      invalidEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(false)
      })
    })

    it('should reject emails with only spaces', () => {
      expect(isValidEmail('   ')).toBe(false)
    })

    it('should handle special characters correctly', () => {
      expect(isValidEmail('user+filter@example.com')).toBe(true)
      expect(isValidEmail('user_name@example.com')).toBe(true)
      expect(isValidEmail('user-name@example.com')).toBe(true)
    })

    it('should handle multiple dots in domain', () => {
      expect(isValidEmail('user@mail.example.co.uk')).toBe(true)
      expect(isValidEmail('user@subdomain.example.com')).toBe(true)
    })

    it('should reject emails without @', () => {
      expect(isValidEmail('userexample.com')).toBe(false)
    })

    it('should reject emails without domain', () => {
      expect(isValidEmail('user@')).toBe(false)
    })

    it('should reject emails without user', () => {
      expect(isValidEmail('@example.com')).toBe(false)
    })
  })

  describe('emailRegex', () => {
    it('should be a valid RegExp instance', () => {
      expect(emailRegex).toBeInstanceOf(RegExp)
    })

    it('should match valid email format', () => {
      expect(emailRegex.test('test@example.com')).toBe(true)
    })

    it('should not match invalid email format', () => {
      expect(emailRegex.test('invalid-email')).toBe(false)
    })
  })
})

