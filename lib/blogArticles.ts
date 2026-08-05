export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string;
}

export const defaultArticles: BlogArticle[] = [];