import { IComment } from '@/interfaces/comment'
import { mockAuthor } from './user.mock'

export const mockComment: IComment = {
  id: 'comment-123',
  ideaId: '123',
  content: 'Ótima ideia! Gostaria de colaborar.',
  parentCommentId: null,
  author: mockAuthor,
  replies: 2,
  likes: 3,
  isLiked: false,
  createdAt: '2024-01-01T00:00:00.000Z',
}

export const mockCommentReply: IComment = {
  ...mockComment,
  id: 'comment-124',
  parentCommentId: 'comment-123',
  content: 'Obrigado! Vamos conversar mais sobre isso.',
  replies: 0,
}

