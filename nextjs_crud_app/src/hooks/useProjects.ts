import { api } from '@/lib/axios';
import { ApiResponse, ErrorResponse, Project, ProjectDTO, ProjectsResponse } from '@/types/project';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export function useProjects(page: number, status?: string, limit: number = 5) {
  return useQuery<ProjectsResponse, Error, ProjectsResponse, [string, number, string?]>({
    queryKey: ['projects', page, status],
    queryFn: async () => {
      const { data } = await api.get('/projects', {
        params: {
          page,
          limit,
          ...(status ? { status } : {}),
        },
      });
      return data.data;
    },
    placeholderData: keepPreviousData,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation<Project, AxiosError<ErrorResponse>, ProjectDTO>({
    mutationFn: async (project: ProjectDTO) => {
      const { data } = await api.post<ApiResponse<Project>>('/projects', project);
      return data.data;
    },
    onSuccess: (createdProject: Project) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created!');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || 'Error while creating project');
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => {
      await api.delete(`/projects/${projectId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted');
    },
  });
}

export function useProject(id: string | undefined) {
  return useQuery({
    queryKey: ['project', id],
    enabled: !!id, // only runs when id is available
    queryFn: async () => {
      const { data } = await api.get(`/projects/${id}`);
      return data.data as ProjectDTO;
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation<Project, AxiosError<ErrorResponse>, { id: string; data: Partial<ProjectDTO> }>(
    {
      mutationFn: async ({ id, data }: { id: string; data: Partial<ProjectDTO> }) => {
        const { data: response } = await api.put<ApiResponse<Project>>(`/projects/${id}`, data);
        return response.data;
      },
      onSuccess: (updatedProject: Project) => {
        queryClient.invalidateQueries({ queryKey: ['projects'] });
        toast.success('Project updated');
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        toast.error(error.response?.data?.message || 'Error updating project');
      },
    },
  );
}
