import mongoose from 'mongoose';

export async function applyMongoosePlugins(
  connection: mongoose.Connection,
): Promise<void> {
  const autopopulate = await import('mongoose-autopopulate');
  const pluginFn = autopopulate.default || autopopulate;
  connection.plugin(pluginFn);
}
