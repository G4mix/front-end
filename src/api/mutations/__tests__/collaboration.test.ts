import { describe, it, expect } from 'vitest'
import { createCollaborationRequest, approveCollaborationRequest } from '../collaboration'
import { server } from '@/__tests__/setup/msw'
import { http, HttpResponse } from 'msw'

const API_URL = 'http://localhost:3000/v1'

const mockCollaborationRequest = {
  id: 'collab-123',
  ideaId: '123',
  userId: 'user-123',
  message: 'I would like to collaborate',
  status: 'pending',
  createdAt: '2024-01-01T00:00:00.000Z',
}

describe('collaboration mutations', () => {
  describe('createCollaborationRequest', () => {
    it('should create collaboration request successfully', async () => {
      server.use(
        http.post(`${API_URL}/collaboration-request`, () => {
          return HttpResponse.json(mockCollaborationRequest)
        })
      )

      const result = await createCollaborationRequest({
        ideaId: '123',
        message: 'I would like to collaborate',
      })

      expect(result).toEqual(mockCollaborationRequest)
    })

    it('should handle duplicate request errors', async () => {
      server.use(
        http.post(`${API_URL}/collaboration-request`, () => {
          return HttpResponse.json(
            { error: 'Request already exists' },
            { status: 409 }
          )
        })
      )

      await expect(
        createCollaborationRequest({
          ideaId: '123',
          message: 'Test',
        })
      ).rejects.toThrow()
    })

    it('should handle validation errors', async () => {
      server.use(
        http.post(`${API_URL}/collaboration-request`, () => {
          return HttpResponse.json(
            { error: 'Message is required' },
            { status: 400 }
          )
        })
      )

      await expect(
        createCollaborationRequest({
          ideaId: '123',
          message: '',
        })
      ).rejects.toThrow()
    })
  })

  describe('approveCollaborationRequest', () => {
    it('should approve collaboration request successfully', async () => {
      server.use(
        http.patch(`${API_URL}/collaboration-approval`, () => {
          return HttpResponse.json({ success: true })
        })
      )

      await expect(
        approveCollaborationRequest({
          collaborationRequestId: 'collab-123',
          status: 'approved',
        })
      ).resolves.not.toThrow()
    })

    it('should reject collaboration request with feedback', async () => {
      server.use(
        http.patch(`${API_URL}/collaboration-approval`, () => {
          return HttpResponse.json({ success: true })
        })
      )

      await expect(
        approveCollaborationRequest({
          collaborationRequestId: 'collab-123',
          status: 'rejected',
          feedback: 'Not a good fit',
        })
      ).resolves.not.toThrow()
    })

    it('should handle not found errors', async () => {
      server.use(
        http.patch(`${API_URL}/collaboration-approval`, () => {
          return HttpResponse.json(
            { error: 'Request not found' },
            { status: 404 }
          )
        })
      )

      await expect(
        approveCollaborationRequest({
          collaborationRequestId: 'nonexistent',
          status: 'approved',
        })
      ).rejects.toThrow()
    })

    it('should handle unauthorized errors', async () => {
      server.use(
        http.patch(`${API_URL}/collaboration-approval`, () => {
          return HttpResponse.json(
            { error: 'Unauthorized' },
            { status: 403 }
          )
        })
      )

      await expect(
        approveCollaborationRequest({
          collaborationRequestId: 'collab-123',
          status: 'approved',
        })
      ).rejects.toThrow()
    })
  })
})

