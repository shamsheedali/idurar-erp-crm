import { apiHandler } from '@/lib/api-handler';
import { createProjectSchema } from '@/lib/validations/project.schema';
import { successResponse, errorResponse } from '@/lib/response';
import { STATUS, MESSAGES } from '@/lib/constants';
import { Project } from '@/models/project.model';
import { nanoid } from 'nanoid';
import { toProjectResponse } from '@/dto/project.dto';

export const GET = apiHandler(async (req) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '5');
  const status = searchParams.get('status');

  const query: any = {};
  if (status) query.status = status;

  const projects = await Project.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const total = await Project.countDocuments(query);

  return successResponse(
    {
      projects: projects.map(toProjectResponse),
      meta: { page, limit, total },
    },
    MESSAGES.PROJECT_FETCHED,
    STATUS.OK,
  );
});

export const POST = apiHandler(async (req) => {
  const body = await req.json();
  const parsed = createProjectSchema.safeParse(body);

  if (!parsed.success) {
    return errorResponse(MESSAGES.INVALID_INPUT, STATUS.BAD_REQUEST, parsed.error.flatten());
  }

  const existingProject = await Project.findOne({ name: parsed.data.name });
  if (existingProject) {
    return errorResponse('Project with this name already exists.', STATUS.CONFLICT);
  }

  console.log('first', parsed);

  let projectId = '';
  let exists = true;

  while (exists) {
    const shortId = nanoid(3);
    projectId = `PRJ-${shortId}`;

    const result = await Project.exists({ projectId });
    exists = result !== null;
  }

  const created = await Project.create({
    ...parsed.data,
    projectId,
  });

  return successResponse(toProjectResponse(created), MESSAGES.PROJECT_CREATED, STATUS.CREATED);
});
