export type ProjectStatus = 'pending' | 'in_progress' | 'completed';

export interface ProjectDTO {
  projectId?: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectsResponse {
  projects: ProjectDTO[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export type ErrorResponse = {
  message?: string;
};

export type Project = ProjectDTO & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = {
  data: T;
  message?: string;
};
