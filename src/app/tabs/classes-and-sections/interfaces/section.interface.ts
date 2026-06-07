export interface Section {
  id: string;
  classId: string;
  className?: string;
  name: string;
  capacity?: number | null;
  roomNumber?: string | null;
  classTeacher?: string | null;
  studentsCount?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddSectionPayload {
  classId: string;
  name: string;
  capacity?: number | null;
  roomNumber?: string | null;
  classTeacher?: string | null;
  isActive: boolean;
}

export interface UpdateSectionPayload extends AddSectionPayload {
  id: string;
}

export interface SectionListParams {
  classId?: string;
  search?: string;
  isActive?: boolean;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}
