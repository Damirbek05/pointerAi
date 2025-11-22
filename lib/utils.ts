import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Добавляет basePath к пути изображения для корректной работы на GitHub Pages
 * Использует NEXT_PUBLIC_BASE_PATH из переменных окружения (встраивается Next.js во время сборки)
 */
export function getImagePath(path: string): string {
  // Если путь пустой или уже абсолютный URL, возвращаем как есть
  if (!path || path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) {
    return path
  }
  
  // Получаем basePath из переменной окружения (NEXT_PUBLIC_ префикс делает её доступной на клиенте)
  // Next.js автоматически встраивает значение этой переменной во время сборки
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  
  // Если basePath пустой, возвращаем путь как есть (локальная разработка или корневой домен)
  if (!basePath || basePath === '') {
    return path
  }
  
  // Убеждаемся, что путь начинается с /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // Убеждаемся, что basePath не заканчивается на /
  const normalizedBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath
  
  return `${normalizedBasePath}${normalizedPath}`
}
