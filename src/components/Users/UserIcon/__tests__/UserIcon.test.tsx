import { describe, it, expect } from 'vitest'
import { render, screen } from '@/__tests__/setup/test-utils'
import { UserIcon } from '../index'

describe('UserIcon Component', () => {
  describe('With icon', () => {
    it('should render image when icon is provided', () => {
      const { container } = render(
        <UserIcon displayName="John Doe" icon="https://example.com/avatar.jpg" />
      )
      
      const img = container.querySelector('img')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('alt', 'John Doe')
    })

    it('should apply rounded style by default', () => {
      const { container } = render(
        <UserIcon displayName="John" icon="https://example.com/avatar.jpg" />
      )
      
      const img = container.querySelector('img')
      expect(img).toHaveStyle({ borderRadius: '50%' })
    })

    it('should apply square style when rounded is false', () => {
      const { container } = render(
        <UserIcon displayName="John" icon="https://example.com/avatar.jpg" rounded={false} />
      )
      
      const img = container.querySelector('img')
      expect(img).toHaveStyle({ borderRadius: '8px' })
    })

    it('should apply custom size', () => {
      const { container } = render(
        <UserIcon displayName="John" icon="https://example.com/avatar.jpg" size={64} />
      )
      
      const wrapper = container.querySelector('div')
      expect(wrapper).toHaveStyle({ width: '64px', height: '64px' })
    })
  })

  describe('Without icon (fallback)', () => {
    it('should render first letter of displayName when no icon', () => {
      render(<UserIcon displayName="John Doe" />)
      
      expect(screen.getByText('J')).toBeInTheDocument()
    })

    it('should render uppercase first letter', () => {
      render(<UserIcon displayName="alice" />)
      
      expect(screen.getByText('A')).toBeInTheDocument()
    })

    it('should render rounded fallback by default', () => {
      render(<UserIcon displayName="John" />)
      
      const fallback = screen.getByText('J')
      expect(fallback).toBeInTheDocument()
    })

    it('should render square fallback when rounded is false', () => {
      render(<UserIcon displayName="John" rounded={false} />)
      
      const fallback = screen.getByText('J')
      expect(fallback).toBeInTheDocument()
    })

    it('should render fallback with custom size', () => {
      render(<UserIcon displayName="John" size={48} />)
      
      const fallback = screen.getByText('J')
      expect(fallback).toBeInTheDocument()
    })

    it('should apply custom fontSize to fallback', () => {
      render(<UserIcon displayName="John" fontSize="1.5rem" />)
      
      const fallback = screen.getByText('J')
      expect(fallback).toBeInTheDocument()
    })

    it('should apply default fontSize when not provided', () => {
      render(<UserIcon displayName="John" />)
      
      const fallback = screen.getByText('J')
      expect(fallback).toBeInTheDocument()
    })
  })

  describe('Edge cases', () => {
    it('should handle empty string displayName', () => {
      render(<UserIcon displayName="" />)
      
      expect(screen.queryByText(/[A-Z]/)).not.toBeInTheDocument()
    })

    it('should handle null icon', () => {
      render(<UserIcon displayName="John" icon={null} />)
      
      expect(screen.getByText('J')).toBeInTheDocument()
    })

    it('should handle single character displayName', () => {
      render(<UserIcon displayName="X" />)
      
      expect(screen.getByText('X')).toBeInTheDocument()
    })
  })
})

