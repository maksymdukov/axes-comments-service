import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WarehouseDocument = Document & Warehouse;

@Schema({ timestamps: true, skipVersioning: true })
export class Warehouse {
  @Prop()
  Ref: string;

  @Prop()
  SiteKey: number;

  @Prop()
  Description: string;

  @Prop()
  DescriptionRu: string;

  @Prop()
  ShortAddress: string;

  @Prop()
  ShortAddressRu: string;

  @Prop()
  Phone: string;

  @Prop()
  TypeOfWarehouse: string;

  @Prop()
  Number: number;

  @Prop()
  CityRef: string;

  @Prop()
  CityDescription: string;

  @Prop()
  CityDescriptionRu: string;

  @Prop()
  SettlementRef: string;

  @Prop()
  SettlementDescription: string;

  @Prop()
  SettlementAreaDescription: string;

  @Prop()
  SettlementRegionsDescription: string;

  @Prop()
  SettlementTypeDescription: string;

  @Prop()
  Longitude: number;

  @Prop()
  Latitude: number;

  @Prop()
  PaymentAccess: string;

  @Prop()
  TotalMaxWeightAllowed: number;

  @Prop()
  PlaceMaxWeightAllowed: number;

  @Prop()
  WarehouseStatus: string;

  @Prop()
  WarehouseStatusDate: string;

  @Prop()
  CategoryOfWarehouse: string;

  @Prop()
  Direct: string;

  createdAt: Date;
  updatedAt: Date;
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);
