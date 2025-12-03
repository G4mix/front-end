import { describe, it, expect } from 'vitest'
import { toggleLike } from '../like'
import { server } from '@/__tests__/setup/msw'
import { http, HttpResponse } from 'msw'

const API_URL = 'http://localhost:3000/v1'

describe('toggleLike', () => {
  it('should toggle like for an idea', async () => {
    await expect(
      toggleLike({
        targetLikeId: '123',
        likeType: 'Idea',
      })
    ).resolves.not.toThrow()
  })

  it('should toggle like for a comment', async () => {
    await expect(
      toggleLike({
        targetLikeId: 'comment-123',
        likeType: 'Comment',
      })
    ).resolves.not.toThrow()
  })

  it('should handle API errors', async () => {
    server.use(
      http.post(`${API_URL}/like`, () => {
        return HttpResponse.json(
          { error: 'Failed to toggle like' },
          { status: 500 }
        )
      })
    )

    await expect(
      toggleLike({
        targetLikeId: '123',
        likeType: 'Idea',
      })
    ).rejects.toThrow()
  })
})

