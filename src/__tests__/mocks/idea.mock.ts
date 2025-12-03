import { IIdea } from '@/interfaces/idea'
import { mockAuthor } from './user.mock'

export const mockIdea: IIdea = {
  id: '123',
  title: 'Aplicativo de Receitas com IA',
  content: 'Um app que sugere receitas baseadas nos ingredientes que você tem em casa',
  images: ['/card.png'],
  links: ['https://example.com'],
  projectId: null,
  author: mockAuthor,
  tags: ['mobile', 'ia', 'culinária'],
  comments: 5,
  likes: 10,
  views: 50,
  isLiked: false,
  isViewed: false,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  hasPendingCollaborationRequest: false,
}

export const mockIdeaLiked: IIdea = {
  ...mockIdea,
  id: '124',
  title: 'Sistema de Gerenciamento de Tarefas',
  isLiked: true,
}

export const mockIdeaWithoutTags: IIdea = {
  ...mockIdea,
  id: '125',
  tags: [],
}

