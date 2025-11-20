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

  @Prop({ type: [String] })
  categoriaResiduo: string;

  @Prop({
    type: {
      lat: Number,
      lng: Number,
    },
  })
  geolocalizacao: {
    lat: number;
    lng: number;
  };
}

export const DescarteSchema = SchemaFactory.createForClass(Descarte);
