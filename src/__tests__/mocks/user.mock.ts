import { IAuthor } from '@/interfaces/user'

export const mockAuthor: IAuthor = {
  id: 'user-123',
  displayName: 'johndoe',
  name: 'John Doe',
  avatarUrl: 'https://example.com/avatar.jpg',
  bio: 'Desenvolvedor Full Stack',
}

export const mockCurrentUser: IAuthor = {
  id: 'current-user-456',
  displayName: 'currentuser',
  name: 'Current User',
  avatarUrl: 'https://example.com/current-avatar.jpg',
  bio: 'Usuário atual',
}

