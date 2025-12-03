import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { formatRelativeTime } from '../dateFormatter'

describe('formatRelativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-15T12:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return "Agora" for dates less than 1 minute ago', () => {
    const date = new Date('2024-01-15T11:59:30')
    expect(formatRelativeTime(date)).toBe('Agora')
  })

  it('should return "Há 1 minuto" for dates 1 minute ago', () => {
    const date = new Date('2024-01-15T11:59:00')
    expect(formatRelativeTime(date)).toBe('Há 1 minuto')
  })

  it('should return "Há X minutos" for dates less than 1 hour ago', () => {
    const date = new Date('2024-01-15T11:30:00')
    expect(formatRelativeTime(date)).toBe('Há 30 minutos')
  })

  it('should return "Há 1 hora" for dates 1 hour ago', () => {
    const date = new Date('2024-01-15T11:00:00')
    expect(formatRelativeTime(date)).toBe('Há 1 hora')
  })

  it('should return "Há X horas" for dates less than 24 hours ago', () => {
    const date = new Date('2024-01-15T08:00:00')
    expect(formatRelativeTime(date)).toBe('Há 4 horas')
  })

  it('should return "Ontem" for dates 1 day ago', () => {
    const date = new Date('2024-01-14T12:00:00')
    expect(formatRelativeTime(date)).toBe('Ontem')
  })

  it('should return "Há X dias" for dates less than 7 days ago', () => {
    const date = new Date('2024-01-10T12:00:00')
    expect(formatRelativeTime(date)).toBe('Há 5 dias')
  })

  it('should return "Há 1 semana" for dates 1 week ago', () => {
    const date = new Date('2024-01-08T12:00:00')
    expect(formatRelativeTime(date)).toBe('Há 1 semana')
  })

  it('should return "Há X semanas" for dates less than 30 days ago', () => {
    const date = new Date('2024-01-01T12:00:00')
    expect(formatRelativeTime(date)).toBe('Há 2 semanas')
  })

  it('should return "Há 1 mês" for dates 1 month ago', () => {
    const date = new Date('2023-12-15T12:00:00')
    expect(formatRelativeTime(date)).toBe('Há 1 mês')
  })

  it('should return "Há X meses" for dates less than 1 year ago', () => {
    const date = new Date('2023-09-15T12:00:00')
    expect(formatRelativeTime(date)).toBe('Há 4 meses')
  })

  it('should return "Há 1 ano" for dates 1 year ago', () => {
    const date = new Date('2023-01-15T12:00:00')
    expect(formatRelativeTime(date)).toBe('Há 1 ano')
  })

  it('should return "Há X anos" for dates more than 1 year ago', () => {
    const date = new Date('2021-01-15T12:00:00')
    expect(formatRelativeTime(date)).toBe('Há 3 anos')
  })

  it('should handle ISO string format', () => {
    const isoDate = '2024-01-15T11:30:00'
    expect(formatRelativeTime(isoDate)).toBe('Há 30 minutos')
  })

  it('should handle timestamp format', () => {
    const timestamp = new Date('2024-01-15T11:30:00').getTime()
    expect(formatRelativeTime(timestamp)).toBe('Há 30 minutos')
  })
})

