export const STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
} as const;

export const MESSAGES = {
  PROJECT_CREATED: 'Project created successfully',
  PROJECT_FETCHED: 'Projects fetched successfully',
  PROJECT_UPDATED: 'Project updated successfully',
  PROJECT_DELETED: 'Project deleted successfully',
  INVALID_INPUT: 'Invalid input data',
  SERVER_ERROR: 'Something went wrong',
  NOT_FOUND: 'Resource not found',
} as const;
