import { describe, it, expect } from 'vitest'
import { updateUserProfile, deleteUser } from '../user'
import { server } from '@/__tests__/setup/msw'
import { http, HttpResponse } from 'msw'
import { mockCurrentUser } from '@/__tests__/mocks/user.mock'

const API_URL = 'http://localhost:3000/v1'

describe('user mutations', () => {
  describe('updateUserProfile', () => {
    it('should update user profile successfully', async () => {
      const updatedUser = {
        ...mockCurrentUser,
        name: 'Updated Name',
      }

      server.use(
        http.patch(`${API_URL}/user`, () => {
          return HttpResponse.json(updatedUser)
        })
      )

      const formData = new FormData()
      formData.append('name', 'Updated Name')

      const result = await updateUserProfile(formData)

      expect(result.name).toBe('Updated Name')
    })

    it('should update profile with avatar', async () => {
      server.use(
        http.patch(`${API_URL}/user`, () => {
          return HttpResponse.json({
            ...mockCurrentUser,
            avatarUrl: 'new-avatar.jpg',
          })
        })
      )

      const formData = new FormData()
      const file = new File(['avatar'], 'avatar.jpg', { type: 'image/jpeg' })
      formData.append('avatar', file)

      const result = await updateUserProfile(formData)

      expect(result.avatarUrl).toBe('new-avatar.jpg')
    })

    it('should handle validation errors', async () => {
      server.use(
        http.patch(`${API_URL}/user`, () => {
          return HttpResponse.json(
            { error: 'Invalid data' },
            { status: 400 }
          )
        })
      )

      const formData = new FormData()
      await expect(updateUserProfile(formData)).rejects.toThrow()
    })

    it('should handle unauthorized errors', async () => {
      server.use(
        http.patch(`${API_URL}/user`, () => {
          return HttpResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
          )
        })
      )

      const formData = new FormData()
      await expect(updateUserProfile(formData)).rejects.toThrow()
    })
  })

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      server.use(
        http.delete(`${API_URL}/user`, () => {
          return HttpResponse.json({ success: true })
        })
      )

      await expect(deleteUser()).resolves.not.toThrow()
    })

    it('should handle unauthorized errors', async () => {
      server.use(
        http.delete(`${API_URL}/user`, () => {
          return HttpResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
          )
        })
      )

      await expect(deleteUser()).rejects.toThrow()
    })

    it('should handle server errors', async () => {
      server.use(
        http.delete(`${API_URL}/user`, () => {
          return HttpResponse.json(
            { error: 'Failed to delete user' },
            { status: 500 }
          )
        })
      )

      await expect(deleteUser()).rejects.toThrow()
    })
  })
})

