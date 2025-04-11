import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type HoagieDocument = HydratedDocument<Hoagie>

@Schema({ timestamps: true })
export class Hoagie {
  @Prop({ required: true })
  name!: string

  @Prop({ type: [String], default: [] })
  ingredients!: string[]

  @Prop()
  picture?: string

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  creatorId!: Types.ObjectId

  @Prop()
  createdAt!: Date

  @Prop()
  updatedAt!: Date
}

export const HoagieSchema = SchemaFactory.createForClass(Hoagie)
