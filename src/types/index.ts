export type Language = 'de' | 'en' | 'fr' | 'es' | 'it';

export interface ModuleItem {
  id: string;
  slug: string;
  title: Record<Language, string>;
  description?: Record<Language, string>;
  type: 'CoursePresentation' | 'InteractiveVideo' | 'QuestionSet' | 'Flashcards' | 'Other';
  duration?: string;
  status?: 'completed' | 'in_progress' | 'not_started';
  library_id?: number;
  library_name?: string;
  library_title?: string;
  params?: any;
}

export interface CluevoModule {
  id: number;
  post_id: number;
  name: string;
  slug: string;
  description: string;
  h5p_id?: number;
  type?: string;
}

export interface LearningTreeNode {
  id: number;
  title: string;
  slug: string;
  parent_id: number;
  children?: LearningTreeNode[];
  h5p_id?: number;
}
