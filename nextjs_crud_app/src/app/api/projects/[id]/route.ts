import { apiHandler } from '@/lib/api-handler';
import { MESSAGES, STATUS } from '@/lib/constants';
import { errorResponse, successResponse } from '@/lib/response';
import { updateProjectSchema } from '@/lib/validations/project.schema';
import { Project } from '@/models/project.model';

export const GET = apiHandler(async (req) => {
  const id = req.url.split('/').pop();

  const project = await Project.findOne({ projectId: id }).lean();
  if (!project) {
    return errorResponse(MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);
  }

  return successResponse(project, MESSAGES.PROJECT_FETCHED, STATUS.OK);
});

export const PUT = apiHandler(async (req) => {
  const id = req.url.split('/').pop();
  const body = await req.json();

  const parsed = updateProjectSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(MESSAGES.INVALID_INPUT, STATUS.BAD_REQUEST, parsed.error.flatten());
  }

  const updated = await Project.findOneAndUpdate({ projectId: id }, parsed.data, {
    new: true,
  }).lean();

  if (!updated) {
    return errorResponse(MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);
  }

  return successResponse(updated, MESSAGES.PROJECT_UPDATED, STATUS.OK);
});

export const DELETE = apiHandler(async (req) => {
  const id = req.url.split('/').pop();

  const deleted = await Project.findOneAndDelete({ projectId: id }).lean();
  if (!deleted) {
    return errorResponse(MESSAGES.NOT_FOUND, STATUS.NOT_FOUND);
  }

  return successResponse(deleted, MESSAGES.PROJECT_DELETED, STATUS.OK);
});
