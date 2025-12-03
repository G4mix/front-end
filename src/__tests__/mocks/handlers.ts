import { http, HttpResponse } from 'msw'
import { mockIdea, mockIdeaLiked } from './idea.mock'
import { mockComment } from './comment.mock'
import { mockCurrentUser, mockAuthor } from './user.mock'

const API_URL = 'http://localhost:3000/v1'

export const handlers = [
  http.post(`${API_URL}/like`, () => {
    return HttpResponse.json({ success: true })
  }),

  http.post(`${API_URL}/view`, () => {
    return HttpResponse.json({ success: true })
  }),

  http.post(`${API_URL}/comment`, () => {
    return HttpResponse.json(mockComment)
  }),

  http.post(`${API_URL}/collaboration-request`, () => {
    return HttpResponse.json({ success: true })
  }),

  http.patch(`${API_URL}/collaboration-approval`, () => {
    return HttpResponse.json({ success: true })
  }),

  http.post(`${API_URL}/follow`, () => {
    return HttpResponse.json({ success: true })
  }),

  http.post(`${API_URL}/idea`, () => {
    return HttpResponse.json(mockIdea)
  }),

  http.patch(`${API_URL}/idea/:id`, ({ params }) => {
    return HttpResponse.json({
      ...mockIdea,
      id: params.id,
    })
  }),

  http.delete(`${API_URL}/idea/:id`, () => {
    return HttpResponse.json({ success: true })
  }),

  http.get(`${API_URL}/idea`, () => {
    return HttpResponse.json({
      data: [mockIdea, mockIdeaLiked],
      total: 2,
      page: 0,
      quantity: 10,
    })
  }),

  http.get(`${API_URL}/idea/:id`, ({ params }) => {
    return HttpResponse.json({
      ...mockIdea,
      id: params.id,
    })
  }),

  http.get(`${API_URL}/comment`, () => {
    return HttpResponse.json({
      data: [mockComment],
      total: 1,
      page: 0,
      quantity: 10,
    })
  }),

  http.get(`${API_URL}/user/my-user`, () => {
    return HttpResponse.json(mockCurrentUser)
  }),

  http.get(`${API_URL}/user/:id`, () => {
    return HttpResponse.json(mockAuthor)
  }),

  http.get(`${API_URL}/user`, ({ request }) => {
    const url = new URL(request.url)
    const pathname = url.pathname
    
    if (pathname.endsWith('/my-user')) {
      return HttpResponse.json(mockCurrentUser)
    }
    
    if (pathname.match(/\/user\/[^/]+$/)) {
      return HttpResponse.json(mockAuthor)
    }
    
    return HttpResponse.json({
      data: [mockCurrentUser, mockAuthor],
      total: 2,
      page: 0,
      quantity: 10,
    })
  }),

  http.patch(`${API_URL}/user`, () => {
    return HttpResponse.json(mockCurrentUser)
  }),

  http.delete(`${API_URL}/user`, () => {
    return HttpResponse.json({ success: true })
  }),
]

