'use client';

import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { useProject } from '@/hooks/useProjects';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

const SingleProjectPage = () => {
  const { id } = useParams();
  const { data: project, isLoading } = useProject(id as string);
  const router = useRouter();

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

  if (!project)
    return (
      <>
        <Header />
        <hr />
        <div className="h-[calc(100vh_-_101px)] w-full flex items-center justify-center">
          <p className="text-center">Project not found!</p>
        </div>
      </>
    );

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={() => router.push('/projects')}>
            ← Back to Projects
          </Button>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-md p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{project.name}</h1>
            <p className="text-neutral-400 text-lg">{project.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-neutral-300">
              <span className="font-semibold">Status:</span>{' '}
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
            </p>

            <p className="text-sm text-neutral-400">
              <span className="font-semibold">Created at:</span>{' '}
              {project.createdAt
                ? new Date(project.createdAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })
                : 'Unknown date'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default SingleProjectPage;
