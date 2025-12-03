import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/__tests__/setup/test-utils'
import { Feed } from '../index'
import { server } from '@/__tests__/setup/msw'
import { http, HttpResponse } from 'msw'
import { mockIdea, mockIdeaLiked } from '@/__tests__/mocks/idea.mock'

const API_URL = 'http://localhost:3000/v1'

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    userProfile: { id: 'user-123' },
  }),
}))

vi.mock('@/utils/toast', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

describe('Feed Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render feed container', () => {
    render(<Feed />)
    
    const feedContainer = document.querySelector('[class*="feedContainer"]')
    expect(feedContainer).toBeInTheDocument()
  })

  it('should fetch and display ideas', async () => {
    render(<Feed />)

    await waitFor(() => {
      expect(screen.getByText(mockIdea.title)).toBeInTheDocument()
    })
  })

  it('should display multiple ideas', async () => {
    render(<Feed />)

    await waitFor(() => {
      expect(screen.getByText(mockIdea.title)).toBeInTheDocument()
      expect(screen.getByText(mockIdeaLiked.title)).toBeInTheDocument()
    })
  })

  it('should display idea authors', async () => {
    render(<Feed />)

    await waitFor(() => {
      const authorElements = screen.getAllByText(`@${mockIdea.author.displayName}`)
      expect(authorElements.length).toBeGreaterThan(0)
    })
  })

  it('should handle empty feed', async () => {
    server.use(
      http.get(`${API_URL}/idea`, () => {
        return HttpResponse.json({
          data: [],
          total: 0,
          page: 0,
          quantity: 10,
        })
      })
    )

    render(<Feed />)

    await waitFor(() => {
      expect(screen.queryByText(mockIdea.title)).not.toBeInTheDocument()
    })
  })


  it('should render FeedHeader component', () => {
    render(<Feed />)
    
    const feedHeader = document.querySelector('[class*="feedContainer"]')
    expect(feedHeader).toBeInTheDocument()
  })

  it('should render ideas in a container', async () => {
    render(<Feed />)

    await waitFor(() => {
      const ideasContainer = document.querySelector('[class*="ideasContainer"]')
      expect(ideasContainer).toBeInTheDocument()
    })
  })

  it('should fetch ideas on mount', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch')
    
    render(<Feed />)

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/idea'),
        expect.any(Object)
      )
    })

    fetchSpy.mockRestore()
  })

  it('should pass correct query parameters', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch')
    
    render(<Feed />)

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('page=0'),
        expect.any(Object)
      )
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('quantity=8'),
        expect.any(Object)
      )
    })

    fetchSpy.mockRestore()
  })
})

