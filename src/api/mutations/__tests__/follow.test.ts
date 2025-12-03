import { describe, it, expect } from 'vitest'
import { toggleFollow } from '../follow'
import { server } from '@/__tests__/setup/msw'
import { http, HttpResponse } from 'msw'

const API_URL = 'http://localhost:3000/v1'

describe('follow mutations', () => {
  describe('toggleFollow', () => {
    it('should follow a user successfully', async () => {
      server.use(
        http.post(`${API_URL}/follow`, () => {
          return HttpResponse.json({ success: true, action: 'followed' })
        })
      )

      await expect(
        toggleFollow({ targetUserId: 'user-123' })
      ).resolves.not.toThrow()
    })

    it('should unfollow a user successfully', async () => {
      server.use(
        http.post(`${API_URL}/follow`, () => {
          return HttpResponse.json({ success: true, action: 'unfollowed' })
        })
      )

      await expect(
        toggleFollow({ targetUserId: 'user-123' })
      ).resolves.not.toThrow()
    })

    it('should handle user not found errors', async () => {
      server.use(
        http.post(`${API_URL}/follow`, () => {
          return HttpResponse.json(
            { error: 'User not found' },
            { status: 404 }
          )
        })
      )

      await expect(
        toggleFollow({ targetUserId: 'nonexistent' })
      ).rejects.toThrow()
    })

    it('should handle self-follow attempts', async () => {
      server.use(
        http.post(`${API_URL}/follow`, () => {
          return HttpResponse.json(
            { error: 'Cannot follow yourself' },
            { status: 400 }
          )
        })
      )

      await expect(
        toggleFollow({ targetUserId: 'self' })
      ).rejects.toThrow()
    })

    it('should handle unauthorized errors', async () => {
      server.use(
        http.post(`${API_URL}/follow`, () => {
          return HttpResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
          )
        })
      )

      await expect(
        toggleFollow({ targetUserId: 'user-123' })
      ).rejects.toThrow()
    })
  })
})

