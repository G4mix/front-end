import { describe, it, expect } from 'vitest'
import { render } from '@/__tests__/setup/test-utils'
import { ImageDisplay } from '../index'

describe('ImageDisplay Component', () => {
  it('should render container', () => {
    const { container } = render(<ImageDisplay />)
    
    const imgContainer = container.querySelector('[class*="imgContainer"]')
    expect(imgContainer).toBeInTheDocument()
  })

  describe('With image', () => {
    it('should render image when src is provided', () => {
      const { container } = render(
        <ImageDisplay image={{ src: 'https://example.com/image.jpg' }} />
      )
      
      const img = container.querySelector('img')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src')
    })

    it('should use provided alt text', () => {
      const { container } = render(
        <ImageDisplay image={{ src: 'https://example.com/image.jpg', alt: 'Test image' }} />
      )
      
      const img = container.querySelector('img')
      expect(img).toHaveAttribute('alt', 'Test image')
    })

    it('should use empty alt when not provided', () => {
      const { container } = render(
        <ImageDisplay image={{ src: 'https://example.com/image.jpg' }} />
      )
      
      const img = container.querySelector('img')
      expect(img).toHaveAttribute('alt', '')
    })

    it('should not render fallback icon when image is provided', () => {
      const { container } = render(
        <ImageDisplay image={{ src: 'https://example.com/image.jpg' }} />
      )
      
      const icon = container.querySelector('[class*="imgIcon"]')
      expect(icon).not.toBeInTheDocument()
    })
  })

  describe('Without image (fallback)', () => {
    it('should render fallback icon when no image', () => {
      const { container } = render(<ImageDisplay />)
      
      const icon = container.querySelector('[class*="imgIcon"]')
      expect(icon).toBeInTheDocument()
    })

    it('should not render img element when no image', () => {
      const { container } = render(<ImageDisplay />)
      
      const img = container.querySelector('img')
      expect(img).not.toBeInTheDocument()
    })

    it('should render fallback when image is undefined', () => {
      const { container } = render(<ImageDisplay image={undefined} />)
      
      const icon = container.querySelector('[class*="imgIcon"]')
      expect(icon).toBeInTheDocument()
    })
  })
})

