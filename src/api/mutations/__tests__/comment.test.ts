import { describe, it, expect } from 'vitest'
import { createComment } from '../comment'
import { server } from '@/__tests__/setup/msw'
import { http, HttpResponse } from 'msw'
import { mockComment } from '@/__tests__/mocks/comment.mock'

const API_URL = 'http://localhost:3000/v1'

describe('comment mutations', () => {
  describe('createComment', () => {
    it('should create a new comment successfully', async () => {
      server.use(
        http.post(`${API_URL}/comment`, () => {
          return HttpResponse.json(mockComment)
        })
      )

      const result = await createComment({
        ideaId: '123',
        content: 'Great idea!',
      })

      expect(result).toEqual(mockComment)
    })

    it('should create a reply to a comment', async () => {
      const replyComment = {
        ...mockComment,
        parentCommentId: 'parent-123',
      }

      server.use(
        http.post(`${API_URL}/comment`, () => {
          return HttpResponse.json(replyComment)
        })
      )

      const result = await createComment({
        ideaId: '123',
        content: 'Thanks for the feedback!',
        parentCommentId: 'parent-123',
      })

      expect(result.parentCommentId).toBe('parent-123')
    })

    it('should handle API errors', async () => {
      server.use(
        http.post(`${API_URL}/comment`, () => {
          return HttpResponse.json(
            { error: 'Failed to create comment' },
            { status: 500 }
          )
        })
      )

      await expect(
        createComment({
          ideaId: '123',
          content: 'Test comment',
        })
      ).rejects.toThrow()
    })

    it('should handle validation errors', async () => {
      server.use(
        http.post(`${API_URL}/comment`, () => {
          return HttpResponse.json(
            { error: 'Content is required' },
            { status: 400 }
          )
        })
      )

      await expect(
        createComment({
          ideaId: '123',
          content: '',
        })
      ).rejects.toThrow()
    })

    it('should handle unauthorized errors', async () => {
      server.use(
        http.post(`${API_URL}/comment`, () => {
          return HttpResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
          )
        })
      )

      await expect(
        createComment({
          ideaId: '123',
          content: 'Test',
        })
      ).rejects.toThrow()
    })
  })
})

