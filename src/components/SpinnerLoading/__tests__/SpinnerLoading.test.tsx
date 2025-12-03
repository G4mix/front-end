import { describe, it, expect } from 'vitest'
import { render } from '@/__tests__/setup/test-utils'
import { SpinnerLoading } from '../index'

describe('SpinnerLoading Component', () => {
  it('should render loading container', () => {
    const { container } = render(<SpinnerLoading />)
    
    const loadingContainer = container.querySelector('[class*="dotLoadingContainer"]')
    expect(loadingContainer).toBeInTheDocument()
  })

  it('should render three spinner dots', () => {
    const { container } = render(<SpinnerLoading />)
    
    const dots = container.querySelectorAll('[class*="dotLoading"] span')
    expect(dots).toHaveLength(3)
  })

  it('should not apply primary class by default', () => {
    const { container } = render(<SpinnerLoading />)
    
    const dots = container.querySelectorAll('[class*="dotLoading"] span')
    dots.forEach(dot => {
      expect(dot.className).not.toContain('primary')
    })
  })

  it('should apply primary class when isPrimary is true', () => {
    const { container } = render(<SpinnerLoading isPrimary={true} />)
    
    const dots = container.querySelectorAll('[class*="dotLoading"] span')
    dots.forEach(dot => {
      expect(dot.className).toContain('primary')
    })
  })

  it('should render correctly with isPrimary false', () => {
    const { container } = render(<SpinnerLoading isPrimary={false} />)
    
    const loadingContainer = container.querySelector('[class*="dotLoadingContainer"]')
    expect(loadingContainer).toBeInTheDocument()
  })
})

