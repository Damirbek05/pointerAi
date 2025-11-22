/** @type {import('next').NextConfig} */
// Определяем basePath для GitHub Pages
// Если GITHUB_REPOSITORY установлена (в GitHub Actions), используем имя репозитория
// Для корневого домена (username.github.io) basePath должен быть пустым
const getBasePath = () => {
  // Если явно указан basePath через переменную окружения, используем его
  if (process.env.NEXT_PUBLIC_BASE_PATH !== undefined) {
    return process.env.NEXT_PUBLIC_BASE_PATH || '';
  }
  
  if (process.env.GITHUB_REPOSITORY) {
    // Формат: username/repo-name, нам нужно только repo-name
    const [, repoName] = process.env.GITHUB_REPOSITORY.split('/');
    
    // Если репозиторий называется username.github.io, это корневой домен - basePath пустой
    if (repoName && repoName.endsWith('.github.io')) {
      return '';
    }
    
    // Для обычных репозиториев используем имя репозитория как basePath
    return repoName ? `/${repoName}` : '';
  }
  
  // Для локальной разработки basePath пустой
  return '';
};

const basePath = getBasePath();

const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
