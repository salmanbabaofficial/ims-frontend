export interface Class {
  id: string;
  name: string;
  level?: string | null;
  description?: string | null;
  sectionsCount?: number;
  studentsCount?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddClassPayload {
  name: string;
  level?: string | null;
  description?: string | null;
  isActive: boolean;
}

export interface UpdateClassPayload extends AddClassPayload {
  id: string;
}

export interface ClassListParams {
  search?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}
