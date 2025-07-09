import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class Invoice extends Document {
  @Prop({ default: false })
  removed: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Admin', required: true })
  createdBy: Types.ObjectId;

  @Prop({ required: true })
  number: number;

  @Prop({ required: true })
  year: number;

  @Prop()
  content: string;

  @Prop({ enum: ['daily', 'weekly', 'monthly', 'annually', 'quarter'] })
  recurring: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  expiredDate: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Client',
    autopopulate: true,
    required: true,
  })
  client: Types.ObjectId;

  @Prop({
    type: {
      from: { type: String, enum: ['quote', 'offer'] },
      offer: { type: MongooseSchema.Types.ObjectId, ref: 'Offer' },
      quote: { type: MongooseSchema.Types.ObjectId, ref: 'Quote' },
    },
  })
  converted: {
    from: string;
    offer?: Types.ObjectId;
    quote?: Types.ObjectId;
  };

  @Prop([
    {
      itemName: { type: String, required: true },
      description: { type: String },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ])
  items: {
    itemName: string;
    description?: string;
    quantity: number;
    price: number;
    total: number;
  }[];

  @Prop({ default: 0 })
  taxRate: number;

  @Prop({ default: 0 })
  subTotal: number;

  @Prop({ default: 0 })
  taxTotal: number;

  @Prop({ default: 0 })
  total: number;

  @Prop({ required: true, default: 'NA', uppercase: true })
  currency: string;

  @Prop({ default: 0 })
  credit: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Payment' }])
  payment: Types.ObjectId[];

  @Prop({ default: 'unpaid', enum: ['unpaid', 'paid', 'partially'] })
  paymentStatus: string;

  @Prop({ default: false })
  isOverdue: boolean;

  @Prop({ default: false })
  approved: boolean;

  @Prop()
  notes: string;

  @Prop({
    enum: ['draft', 'pending', 'sent', 'refunded', 'cancelled', 'on hold'],
    default: 'draft',
  })
  status: string;

  @Prop()
  pdf: string;

  @Prop([
    {
      id: String,
      name: String,
      path: String,
      description: String,
      isPublic: { type: Boolean, default: true },
    },
  ])
  files: {
    id: string;
    name: string;
    path: string;
    description?: string;
    isPublic?: boolean;
  }[];
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
