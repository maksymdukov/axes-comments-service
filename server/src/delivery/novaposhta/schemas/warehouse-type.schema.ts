import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WarehouseTypeDocument = Document & WarehouseType;

@Schema({ timestamps: true, skipVersioning: true })
export class WarehouseType {
  @Prop({ unique: true, required: true })
  Ref: string;

  @Prop()
  Description: string;

  @Prop()
  DescriptionRu: string;

  createdAt: Date;
  updatedAt: Date;
}

export const WarehouseTypeSchema = SchemaFactory.createForClass(WarehouseType);
