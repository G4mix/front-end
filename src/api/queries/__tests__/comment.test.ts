import { describe, it, expect } from 'vitest'
import { getComments } from '../comment'
import { server } from '@/__tests__/setup/msw'
import { http, HttpResponse } from 'msw'
import { mockComment, mockCommentReply } from '@/__tests__/mocks/comment.mock'

const API_URL = 'http://localhost:3000/v1'

describe('comment queries', () => {
  describe('getComments', () => {
    it('should fetch comments for an idea', async () => {
      const result = await getComments({ ideaId: '123', page: 0, quantity: 10 })

      expect(result.data).toBeDefined()
      expect(Array.isArray(result.data)).toBe(true)
      expect(result.data).toHaveLength(1)
    })

    it('should fetch replies for a comment', async () => {
      server.use(
        http.get(`${API_URL}/comment`, ({ request }) => {
          const url = new URL(request.url)
          const parentCommentId = url.searchParams.get('parentCommentId')
          
          if (parentCommentId) {
            return HttpResponse.json({
              data: [mockCommentReply],
              total: 1,
              page: 0,
              quantity: 10,
            })
          }
          
          return HttpResponse.json({
            data: [mockComment],
            total: 1,
            page: 0,
            quantity: 10,
          })
        })
      )

      const result = await getComments({
        ideaId: '123',
        parentCommentId: 'comment-123',
        page: 0,
        quantity: 10,
      })

      expect(result.data).toHaveLength(1)
      expect(result.data[0].parentCommentId).toBe('comment-123')
    })

    it('should handle empty comments', async () => {
      server.use(
        http.get(`${API_URL}/comment`, () => {
          return HttpResponse.json({
            data: [],
            total: 0,
            page: 0,
            quantity: 10,
          })
        })
      )

      const result = await getComments({ ideaId: '123', page: 0, quantity: 10 })

      expect(result.data).toHaveLength(0)
      expect(result.total).toBe(0)
    })

    it('should handle pagination', async () => {
      server.use(
        http.get(`${API_URL}/comment`, ({ request }) => {
          const url = new URL(request.url)
          const page = url.searchParams.get('page')
          
          return HttpResponse.json({
            data: [mockComment],
            total: 25,
            page: parseInt(page || '0'),
            quantity: 10,
          })
        })
      )

      const result = await getComments({ ideaId: '123', page: 2, quantity: 10 })

      expect(result.page).toBe(2)
      expect(result.total).toBe(25)
    })

    it('should handle API errors', async () => {
      server.use(
        http.get(`${API_URL}/comment`, () => {
          return HttpResponse.json(
            { error: 'Failed to fetch comments' },
            { status: 500 }
          )
        })
      )

      await expect(
        getComments({ ideaId: '123', page: 0, quantity: 10 })
      ).rejects.toThrow()
    })
  })
})

