import { IProject } from '@/models/project.model';

export function toProjectResponse(project: IProject) {
  return {
    projectId: project.projectId,
    name: project.name,
    description: project.description,
    status: project.status,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}
