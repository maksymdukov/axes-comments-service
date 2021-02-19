import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Warehouse, WarehouseSchema } from './warehouse.schema';

export type SettlementDocument = Document & Settlement;

@Schema({
  timestamps: true,
  skipVersioning: true,
})
export class Settlement {
  @Prop({ unique: true })
  Ref: string;

  @Prop()
  SettlementType: string;

  @Prop()
  Latitude: number;

  @Prop()
  Longitude: number;

  @Prop()
  Description: string;

  @Prop()
  DescriptionRu: string;

  @Prop()
  SettlementTypeDescription: string;

  @Prop()
  SettlementTypeDescriptionRu: string;

  @Prop()
  Region: string;

  @Prop()
  RegionsDescription: string;

  @Prop()
  RegionsDescriptionRu: string;

  @Prop()
  Area: string;

  @Prop()
  AreaDescription: string;

  @Prop()
  AreaDescriptionRu: string;

  @Prop()
  Index1: string;

  @Prop()
  Index2: string;

  @Prop()
  IndexCOATSU1: string;

  @Prop()
  Delivery1: string;

  @Prop()
  Delivery2: string;

  @Prop()
  Delivery3: string;

  @Prop()
  Delivery4: string;

  @Prop()
  Delivery5: string;

  @Prop()
  Delivery6: string;

  @Prop()
  Delivery7: string;

  @Prop()
  SpecialCashCheck: number;

  @Prop({ type: [WarehouseSchema], default: [] })
  warehouses: Warehouse[];

  createdAt: Date;
  updatedAt: Date;
}

export const SettlementSchema = SchemaFactory.createForClass(Settlement);
