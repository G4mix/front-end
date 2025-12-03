import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { render } from '@/__tests__/setup/test-utils'
import { Idea } from '../index'
import { mockIdea, mockIdeaLiked, mockIdeaWithoutTags } from '@/__tests__/mocks/idea.mock'
import { mockCurrentUser } from '@/__tests__/mocks/user.mock'

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    userProfile: mockCurrentUser,
  }),
}))

vi.mock('@/utils/toast', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('Idea Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render idea title and author', () => {
    render(<Idea idea={mockIdea} />)
    
    expect(screen.getByText(mockIdea.title)).toBeInTheDocument()
    expect(screen.getByText(`@${mockIdea.author.displayName}`)).toBeInTheDocument()
  })

  it('should render idea content', () => {
    render(<Idea idea={mockIdea} />)
    
    expect(screen.getByText(mockIdea.content)).toBeInTheDocument()
  })

  it('should render tags when idea has tags', () => {
    render(<Idea idea={mockIdea} />)
    
    mockIdea.tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument()
    })
  })

  it('should not render tags section when idea has no tags', () => {
    const { container } = render(<Idea idea={mockIdeaWithoutTags} />)
    
    const tagsContainer = container.querySelector('[class*="tags"]')
    expect(tagsContainer).not.toBeInTheDocument()
  })

  it('should display correct likes count', () => {
    render(<Idea idea={mockIdea} />)
    
    expect(screen.getByText(mockIdea.likes)).toBeInTheDocument()
  })

  it('should display correct comments count', () => {
    render(<Idea idea={mockIdea} />)
    
    expect(screen.getByText(mockIdea.comments)).toBeInTheDocument()
  })

  it('should show filled thumb icon when idea is liked', () => {
    render(<Idea idea={mockIdeaLiked} />)
    
    const likeButton = screen.getAllByRole('button')[0]
    expect(likeButton.className).toContain('liked')
  })

  it('should navigate to idea detail when clicking content', () => {
    render(<Idea idea={mockIdea} />)
    
    const content = screen.getByText(mockIdea.content)
    fireEvent.click(content)
    
    expect(mockPush).toHaveBeenCalledWith(`/idea/${mockIdea.id}`)
  })

  it('should navigate to idea detail when clicking comments button', () => {
    render(<Idea idea={mockIdea} />)
    
    const commentsButton = screen.getAllByRole('button')[1]
    fireEvent.click(commentsButton)
    
    expect(mockPush).toHaveBeenCalledWith(`/idea/${mockIdea.id}`)
  })

  it('should show collaboration button when user is not the author', () => {
    render(<Idea idea={mockIdea} />)
    
    expect(screen.getByText('Quero colaborar')).toBeInTheDocument()
  })

  it('should not show collaboration button when user is the author', () => {
    const ideaFromCurrentUser = {
      ...mockIdea,
      author: mockCurrentUser,
    }
    
    render(<Idea idea={ideaFromCurrentUser} />)
    
    expect(screen.queryByText('Quero colaborar')).not.toBeInTheDocument()
  })

  it('should not show collaboration button when has pending request', () => {
    const ideaWithPendingRequest = {
      ...mockIdea,
      hasPendingCollaborationRequest: true,
    }
    
    render(<Idea idea={ideaWithPendingRequest} />)
    
    expect(screen.queryByText('Quero colaborar')).not.toBeInTheDocument()
  })

  it('should open collaboration modal when clicking collaborate button', () => {
    render(<Idea idea={mockIdea} />)
    
    const collaborateButton = screen.getByText('Quero colaborar')
    fireEvent.click(collaborateButton)
    
    waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  it('should use background image from idea', () => {
    const { container } = render(<Idea idea={mockIdea} />)
    
    const section = container.querySelector('section')
    expect(section).toHaveStyle({ backgroundImage: `url(${mockIdea.images[0]})` })
  })

  it('should use default image when idea has no images', () => {
    const ideaWithoutImages = {
      ...mockIdea,
      images: [],
    }
    
    const { container } = render(<Idea idea={ideaWithoutImages} />)
    
    const section = container.querySelector('section')
    expect(section).toHaveStyle({ backgroundImage: 'url(/card.png)' })
  })
})

