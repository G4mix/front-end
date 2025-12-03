import { describe, it, expect } from 'vitest'
import { createIdea, updateIdea, deleteIdea, recordView } from '../idea'
import { server } from '@/__tests__/setup/msw'
import { http, HttpResponse } from 'msw'
import { mockIdea } from '@/__tests__/mocks/idea.mock'

const API_URL = 'http://localhost:3000/v1'

describe('idea mutations', () => {
  describe('createIdea', () => {
    it('should create a new idea successfully', async () => {
      server.use(
        http.post(`${API_URL}/idea`, () => {
          return HttpResponse.json(mockIdea)
        })
      )

      const formData = new FormData()
      formData.append('title', 'New Idea')
      formData.append('content', 'Description')

      const result = await createIdea(formData)

      expect(result).toEqual(mockIdea)
    })

    it('should create idea with projectId', async () => {
      server.use(
        http.post(`${API_URL}/idea`, () => {
          return HttpResponse.json({
            ...mockIdea,
            projectId: 'project-123',
          })
        })
      )

      const formData = new FormData()
      formData.append('title', 'New Idea')
      formData.append('content', 'Description')

      const result = await createIdea(formData, 'project-123')

      expect(result.projectId).toBe('project-123')
    })

    it('should handle validation errors', async () => {
      server.use(
        http.post(`${API_URL}/idea`, () => {
          return HttpResponse.json(
            { error: 'Title is required' },
            { status: 400 }
          )
        })
      )

      const formData = new FormData()
      await expect(createIdea(formData)).rejects.toThrow()
    })
  })

  describe('updateIdea', () => {
    it('should update an idea successfully', async () => {
      const updatedIdea = {
        ...mockIdea,
        title: 'Updated Title',
      }

      server.use(
        http.patch(`${API_URL}/idea/${mockIdea.id}`, () => {
          return HttpResponse.json(updatedIdea)
        })
      )

      const formData = new FormData()
      formData.append('title', 'Updated Title')

      const result = await updateIdea(mockIdea.id, formData)

      expect(result.title).toBe('Updated Title')
    })

    it('should handle not found errors', async () => {
      server.use(
        http.patch(`${API_URL}/idea/nonexistent`, () => {
          return HttpResponse.json(
            { error: 'Idea not found' },
            { status: 404 }
          )
        })
      )

      const formData = new FormData()
      await expect(updateIdea('nonexistent', formData)).rejects.toThrow()
    })
  })

  describe('deleteIdea', () => {
    it('should delete an idea successfully', async () => {
      server.use(
        http.delete(`${API_URL}/idea/${mockIdea.id}`, () => {
          return HttpResponse.json({ success: true })
        })
      )

      await expect(deleteIdea(mockIdea.id)).resolves.not.toThrow()
    })

    it('should handle unauthorized deletion', async () => {
      server.use(
        http.delete(`${API_URL}/idea/${mockIdea.id}`, () => {
          return HttpResponse.json(
            { error: 'Unauthorized' },
            { status: 403 }
          )
        })
      )

      await expect(deleteIdea(mockIdea.id)).rejects.toThrow()
    })
  })

  describe('recordView', () => {
    it('should record view successfully', async () => {
      await expect(recordView('123')).resolves.not.toThrow()
    })

    it('should handle errors gracefully', async () => {
      server.use(
        http.post(`${API_URL}/view`, () => {
          return HttpResponse.json(
            { error: 'Failed to record view' },
            { status: 500 }
          )
        })
      )

      await expect(recordView('123')).rejects.toThrow()
    })
  })
})

