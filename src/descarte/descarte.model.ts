import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DescarteDocument = Descarte & Document;

@Schema()
export class Descarte {
  @Prop({ required: true })
  nomeLocal: string;

  @Prop()
  bairro: string;

  @Prop()
  tipoLocal: string;

  @Prop()
  categoriaResiduo: string;

  @Prop()
  geolocalização: string;
}

export const DescarteSchema = SchemaFactory.createForClass(Descarte);
