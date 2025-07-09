import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class QueryNote {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  noteId: Types.ObjectId;

  @Prop({ required: true })
  text: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class Query extends Document {
  @Prop({ default: false })
  removed: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Admin', required: true })
  createdBy: Types.ObjectId;

  @Prop({ required: true })
  number: number;

  @Prop({
    type: Types.ObjectId,
    ref: 'Client',
    required: true,
    autopopulate: true,
  })
  client: Types.ObjectId;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: String,
    enum: ['Open', 'Inprogress', 'Closed'],
    default: 'open',
  })
  status: string;

  @Prop({ default: '' })
  resolution: string;

  @Prop({ type: [QueryNote], default: [] })
  notes: QueryNote[];

  // Timestamps `created` and `updated` are handled by @Schema options
}

export const QuerySchema = SchemaFactory.createForClass(Query);
