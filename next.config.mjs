/** @type {import('next').NextConfig} */
// Определяем basePath для GitHub Pages
// Для репозитория pointerAi basePath должен быть /pointerAi
const getBasePath = () => {
  // Приоритет 1: Явно указанный через переменную окружения
  if (process.env.NEXT_PUBLIC_BASE_PATH !== undefined) {
    return process.env.NEXT_PUBLIC_BASE_PATH;
  }
  
  // Приоритет 2: Определение из GITHUB_REPOSITORY (в GitHub Actions)
  if (process.env.GITHUB_REPOSITORY) {
    const parts = process.env.GITHUB_REPOSITORY.split('/');
    const repoName = parts[1];
    
    // Корневой домен - basePath пустой
    if (repoName && repoName.endsWith('.github.io')) {
      return '';
    }
    
    // Обычный репозиторий - используем имя репозитория
    if (repoName) {
      return `/${repoName}`;
    }
  }
  
  // Локальная разработка - basePath пустой
  return '';
};

const basePath = getBasePath();

// Логирование для отладки
console.log('🔧 Next.js Config:');
console.log('  GITHUB_REPOSITORY:', process.env.GITHUB_REPOSITORY || '(not set)');
console.log('  basePath:', basePath || '(empty - root domain)');
console.log('');

const nextConfig = {
  output: 'export',
  ...(basePath && { basePath }),
  ...(basePath && { assetPrefix: basePath }),
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
