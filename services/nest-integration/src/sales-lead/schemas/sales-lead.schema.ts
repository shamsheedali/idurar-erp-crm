import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class SalesLead extends Document {
  @Prop({ required: true })
  leadName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop()
  company?: string;

  @Prop()
  message?: string;

  @Prop({ type: Types.ObjectId, ref: 'Client', autopopulate: true })
  client?: Types.ObjectId;
}

export const SalesLeadSchema = SchemaFactory.createForClass(SalesLead);
