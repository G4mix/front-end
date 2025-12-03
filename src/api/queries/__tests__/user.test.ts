import { describe, it, expect } from 'vitest'
import { getMyUserProfile, getUserProfile, getUsers, getUserById } from '../user'
import { server } from '@/__tests__/setup/msw'
import { http, HttpResponse } from 'msw'
import { mockCurrentUser, mockAuthor } from '@/__tests__/mocks/user.mock'

const API_URL = 'http://localhost:3000/v1'

describe('user queries', () => {
  describe('getMyUserProfile', () => {
    it('should fetch current user profile', async () => {
      server.use(
        http.get(`${API_URL}/user/my-user`, () => {
          return HttpResponse.json(mockCurrentUser)
        })
      )

      const result = await getMyUserProfile()

      expect(result).toEqual(mockCurrentUser)
    })

    it('should handle unauthorized errors', async () => {
      server.use(
        http.get(`${API_URL}/user/my-user`, () => {
          return HttpResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
          )
        })
      )

      await expect(getMyUserProfile()).rejects.toThrow()
    })
  })

  describe('getUserProfile', () => {
    it('should fetch user profile', async () => {
      server.use(
        http.get(`${API_URL}/user`, () => {
          return HttpResponse.json(mockCurrentUser)
        })
      )

      const result = await getUserProfile()

      expect(result).toBeDefined()
    })

    it('should handle errors', async () => {
      server.use(
        http.get(`${API_URL}/user`, () => {
          return HttpResponse.json(
            { error: 'Failed to fetch profile' },
            { status: 500 }
          )
        })
      )

      await expect(getUserProfile()).rejects.toThrow()
    })
  })

  describe('getUsers', () => {
    it('should fetch users list', async () => {
      const result = await getUsers({ page: 0, quantity: 10 })

      expect(result.data).toBeDefined()
      expect(Array.isArray(result.data)).toBe(true)
      expect(result.data.length).toBeGreaterThan(0)
    })

    it('should search users by term', async () => {
      server.use(
        http.get(`${API_URL}/user`, ({ request }) => {
          const url = new URL(request.url)
          const search = url.searchParams.get('search')
          
          if (search === 'john') {
            return HttpResponse.json({
              data: [mockAuthor],
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

      const result = await getUsers({ search: 'john', page: 0, quantity: 10 })

      expect(result.data).toHaveLength(1)
    })

    it('should handle pagination', async () => {
      server.use(
        http.get(`${API_URL}/user`, ({ request }) => {
          const url = new URL(request.url)
          const page = url.searchParams.get('page')
          
          return HttpResponse.json({
            data: [mockCurrentUser],
            total: 50,
            page: parseInt(page || '0'),
            quantity: 10,
          })
        })
      )

      const result = await getUsers({ page: 2, quantity: 10 })

      expect(result.page).toBe(2)
      expect(result.total).toBe(50)
    })

    it('should handle empty results', async () => {
      server.use(
        http.get(`${API_URL}/user`, () => {
          return HttpResponse.json({
            data: [],
            total: 0,
            page: 0,
            quantity: 10,
          })
        })
      )

      const result = await getUsers({ page: 0, quantity: 10 })

      expect(result.data).toHaveLength(0)
    })
  })

  describe('getUserById', () => {
    it('should fetch user by id', async () => {
      server.use(
        http.get(`${API_URL}/user/:id`, () => {
          return HttpResponse.json(mockAuthor)
        })
      )

      const result = await getUserById('user-123')

      expect(result).toBeDefined()
      expect(result.id).toBe(mockAuthor.id)
    })

    it('should handle not found errors', async () => {
      server.use(
        http.get(`${API_URL}/user/:id`, () => {
          return HttpResponse.json(
            { error: 'User not found' },
            { status: 404 }
          )
        })
      )

      await expect(getUserById('nonexistent')).rejects.toThrow()
    })
  })
})

