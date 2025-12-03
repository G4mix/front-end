import { describe, it, expect } from 'vitest'
import { getIdeas, getIdeaById } from '../idea'
import { server } from '@/__tests__/setup/msw'
import { http, HttpResponse } from 'msw'
import { mockIdea } from '@/__tests__/mocks/idea.mock'

const API_URL = 'http://localhost:3000/v1'

describe('idea queries', () => {
  describe('getIdeas', () => {
    it('should fetch ideas with default pagination', async () => {
      const result = await getIdeas({ page: 0, quantity: 10 })

      expect(result.data).toBeDefined()
      expect(Array.isArray(result.data)).toBe(true)
      expect(result.total).toBeDefined()
    })

    it('should fetch ideas with custom pagination', async () => {
      const result = await getIdeas({ page: 1, quantity: 5 })

      expect(result.data).toBeDefined()
      expect(result.page).toBe(0)
      expect(result.quantity).toBe(10)
    })

    it('should filter ideas by author', async () => {
      server.use(
        http.get(`${API_URL}/idea`, ({ request }) => {
          const url = new URL(request.url)
          const authorId = url.searchParams.get('authorId')
          
          if (authorId === 'user-123') {
            return HttpResponse.json({
              data: [mockIdea],
              total: 1,
              page: 0,
              quantity: 10,
            })
          }
          
          return HttpResponse.json({
            data: [],
            total: 0,
            page: 0,
            quantity: 10,
          })
        })
      )

      const result = await getIdeas({ page: 0, quantity: 10, authorId: 'user-123' })

      expect(result.data).toHaveLength(1)
    })

    it('should filter ideas by project', async () => {
      server.use(
        http.get(`${API_URL}/idea`, ({ request }) => {
          const url = new URL(request.url)
          const projectId = url.searchParams.get('projectId')
          
          if (projectId === 'project-123') {
            return HttpResponse.json({
              data: [mockIdea],
              total: 1,
              page: 0,
              quantity: 10,
            })
          }
          
          return HttpResponse.json({
            data: [],
            total: 0,
            page: 0,
            quantity: 10,
          })
        })
      )

      const result = await getIdeas({ page: 0, quantity: 10, projectId: 'project-123' })

      expect(result.data).toHaveLength(1)
    })

    it('should handle empty results', async () => {
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

      const result = await getIdeas({ page: 0, quantity: 10 })

      expect(result.data).toHaveLength(0)
      expect(result.total).toBe(0)
    })

    it('should handle API errors', async () => {
      server.use(
        http.get(`${API_URL}/idea`, () => {
          return HttpResponse.json(
            { error: 'Failed to fetch ideas' },
            { status: 500 }
          )
        })
      )

      await expect(getIdeas({ page: 0, quantity: 10 })).rejects.toThrow()
    })
  })

  describe('getIdeaById', () => {
    it('should fetch idea by id', async () => {
      const result = await getIdeaById('123')

      expect(result).toBeDefined()
      expect(result.id).toBe('123')
    })

    it('should handle not found errors', async () => {
      server.use(
        http.get(`${API_URL}/idea/:id`, () => {
          return HttpResponse.json(
            { error: 'Idea not found' },
            { status: 404 }
          )
        })
      )

      await expect(getIdeaById('nonexistent')).rejects.toThrow()
    })

    it('should handle unauthorized errors', async () => {
      server.use(
        http.get(`${API_URL}/idea/:id`, () => {
          return HttpResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
          )
        })
      )

      await expect(getIdeaById('123')).rejects.toThrow()
    })
  })
})

