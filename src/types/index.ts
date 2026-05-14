export type IconName =
  | 'article' | 'folder' | 'github' | 'x' | 'juejin' | 'zhihu'
  | 'star' | 'sparkle' | 'search' | 'sun' | 'moon' | 'menu' | 'close'
  | 'arrowRight' | 'calendar' | 'clock' | 'rocket' | 'code' | 'grid'
  | 'lightbulb' | 'database' | 'external' | 'mail' | 'user' | 'paperPlane'
  | 'next' | 'react' | 'typescript' | 'tailwind' | 'prisma' | 'framer'
  | 'shadcn' | 'openai' | 'schema' | 'backend' | 'frontend';

export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: IconName;
};

export interface ArticleData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  date: string;
  readTime: number;
  category?: string;
  tags: string[];
  accent?: 'blue' | 'cyan' | 'indigo' | 'moon';
}

export type Article = {
  id: string;
  title: string;
  description: string;
  href: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  icon: IconName;
  accent?: 'blue' | 'cyan' | 'indigo' | 'moon';
};

export type Project = {
  id: string;
  title: string;
  description: string;
  href: string;
  demoHref?: string;
  tags: string[];
  imageLabel: string;
  accent?: 'site' | 'cms' | 'ai';
};

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  href: string;
  demoHref?: string;
  tags: string[];
  imageLabel: string;
  accent?: 'site' | 'cms' | 'ai';
}

export interface TopicData {
  id: string;
  label: string;
  href: string;
  icon: IconName;
}

export type Topic = {
  id: string;
  label: string;
  href: string;
  icon: IconName;
};

export interface TechItemData {
  id: string;
  label: string;
  icon: IconName;
}

export type TechItem = {
  id: string;
  label: string;
  icon: IconName;
};

export interface FeaturedPostData extends ArticleData {
  imageLabel: string;
}

export type FeaturedPost = Article & {
  imageLabel: string;
};

export interface CurrentProjectData {
  title: string;
  description: string;
  status: string;
  progress: number;
  tags: string[];
}

export type CurrentProject = {
  title: string;
  description: string;
  status: string;
  progress: number;
  tags: string[];
};
