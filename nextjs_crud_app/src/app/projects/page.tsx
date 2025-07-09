'use client';

import Header from '@/components/layout/Header';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  useCreateProject,
  useDeleteProject,
  useProjects,
  useUpdateProject,
} from '@/hooks/useProjects';
import { ProjectDTO, ProjectsResponse } from '@/types/project';
import { ListCollapse } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProjectsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);

  const { data: projectData, isLoading } = useProjects(page, statusFilter);

  const typedProjectData = projectData as ProjectsResponse | undefined;

  const totalPages = typedProjectData
    ? Math.ceil(typedProjectData.meta.total / typedProjectData.meta.limit)
    : 1;
  const limit = typedProjectData?.meta?.limit ?? 5;
  const total = typedProjectData?.meta?.total ?? 0;

  <p>
    Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{' '}
    <span className="font-medium">{Math.min(page * limit, total)}</span> of{' '}
    <span className="font-medium">{total}</span> results
  </p>;

  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();

  type ProjectStatus = 'pending' | 'in_progress' | 'completed';

  const [form, setForm] = useState<{
    name: string;
    description: string;
    status: ProjectStatus;
  }>({
    name: '',
    description: '',
    status: 'pending',
  });

  const resetForm = () => {
    setForm({
      name: '',
      description: '',
      status: 'pending',
    });
    setSelectedProject(null);
  };

  const [selectedProject, setSelectedProject] = useState<ProjectDTO | null>(null);

  useEffect(() => {
    if (selectedProject) {
      setForm({
        name: selectedProject.name,
        description: selectedProject.description || '',
        status: selectedProject.status,
      });
    }
  }, [selectedProject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProject(form);
  };

  const handleDelete = (projectId: string) => {
    deleteProject(projectId);
  };

  const handleEdit = (projectId: string) => {
    updateProject(
      { id: projectId, data: form },
      {
        onSuccess: () => {
          resetForm();
        },
      },
    );
  };

  const handleClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  if (isLoading)
    return (
      <>
        <Header />
        <hr />
        <div className="h-[calc(100vh_-_101px)] w-full flex items-center justify-center">
          <p className="text-center">Loading...</p>
        </div>
      </>
    );

  return (
    <>
      <Header />
      <hr />
      <div className="max-w-7xl mx-auto px-4 py-10 ">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">My Projects</h1>

          <div className="flex items-center gap-3">
            <Select
              value={statusFilter ?? 'all'}
              onValueChange={(value) => {
                setStatusFilter(value === 'all' ? undefined : value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    resetForm();
                  }}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add project</DialogTitle>
                  <DialogDescription>
                    Add details to your new project here. Click save when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4">
                    {/* Name Field */}
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter project name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>

                    {/* Description Field */}
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe your project..."
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                      />
                    </div>

                    {/* Status Field */}
                    <div className="grid gap-3">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        name="status"
                        value={form.status}
                        onValueChange={(value) =>
                          setForm((prev) => ({ ...prev, status: value as ProjectDTO['status'] }))
                        }
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" onClick={() => resetForm()}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isCreating}>
                      {isCreating ? 'Creating...' : 'Create'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto border border-neutral-800 rounded-lg shadow-sm bg-neutral-900">
          <table className="min-w-full text-sm">
            <thead className="bg-neutral-800 text-neutral-300 text-left hidden md:table-header-group">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Description</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Created</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-800">
              {typedProjectData && typedProjectData?.projects.length === 0 ? (
                isLoading ? (
                  <tr>
                    <td colSpan={999} className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={999} className="text-center py-4">
                      No projects yet!
                    </td>
                  </tr>
                )
              ) : (
                typedProjectData?.projects?.map((project: ProjectDTO) => (
                  <tr
                    key={project.projectId}
                    className="hover:bg-neutral-800 md:table-row grid grid-cols-1 md:grid-cols-none p-4 md:p-0"
                  >
                    {/* Name */}
                    <td className="px-6 py-4 font-medium text-white">
                      <span className="md:hidden font-semibold text-neutral-400">Name:</span>{' '}
                      {project.name}
                    </td>

                    {/* Description */}
                    <td className="px-6 py-4 text-neutral-400">
                      <span className="md:hidden font-semibold text-neutral-400">Description:</span>{' '}
                      {project.description}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className="md:hidden font-semibold text-neutral-400">Status:</span>{' '}
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'in_progress'
                            ? 'bg-green-600/20 text-green-400'
                            : project.status === 'completed'
                              ? 'bg-blue-600/20 text-blue-400'
                              : 'bg-yellow-600/20 text-yellow-400'
                        }`}
                      >
                        {project.status.replace('_', ' ')}
                      </span>
                    </td>

                    {/* Created */}
                    <td className="px-6 py-4 text-neutral-400">
                      <span className="md:hidden font-semibold text-neutral-400">Created:</span>{' '}
                      {project.createdAt
                        ? new Date(project.createdAt).toLocaleString('en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })
                        : 'Unknown date'}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right space-x-2 flex flex-col md:flex-row md:justify-end">
                      <Button
                        variant={'outline'}
                        onClick={() => handleClick(project.projectId as string)}
                      >
                        {' '}
                        <ListCollapse />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full md:w-fit"
                            onClick={() => setSelectedProject(project)} // Add this
                          >
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit project</DialogTitle>
                            <DialogDescription>
                              Make changes to your project here. Click save when you&apos;re done.
                            </DialogDescription>
                          </DialogHeader>

                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleEdit(project.projectId as string);
                            }}
                          >
                            <div className="grid gap-4">
                              <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                  id="name"
                                  name="name"
                                  placeholder="Enter project name"
                                  value={form.name}
                                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                              </div>

                              <div className="grid gap-3">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                  id="description"
                                  name="description"
                                  placeholder="Describe your project..."
                                  value={form.description}
                                  onChange={(e) =>
                                    setForm({ ...form, description: e.target.value })
                                  }
                                />
                              </div>

                              <div className="grid gap-3">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                  name="status"
                                  value={form.status}
                                  onValueChange={(value) =>
                                    setForm((prev) => ({
                                      ...prev,
                                      status: value as ProjectDTO['status'],
                                    }))
                                  }
                                >
                                  <SelectTrigger id="status">
                                    <SelectValue placeholder="Select a status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">pending</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button type="submit" disabled={isUpdating}>
                                {isUpdating ? 'Updating...' : 'Update'}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant={'destructive'} className="w-full md:w-fit">
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              project and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(project?.projectId as string)}
                              disabled={isDeleting}
                            >
                              {isDeleting ? 'Deleting...' : 'Continue'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 text-sm text-neutral-400">
          <p>
            Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{' '}
            <span className="font-medium">{Math.min(page * limit, total)}</span> of{' '}
            <span className="font-medium">{total}</span> results
          </p>

          <div className="space-x-2 flex">
            <Button
              variant="outline"
              className="w-8 h-8 p-0 flex items-center justify-center"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Button>

            <Button
              variant="outline"
              className="w-8 h-8 p-0 flex items-center justify-center"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
