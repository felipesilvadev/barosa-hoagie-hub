import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

import { User } from './user.schema'

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
  creator!: User
}

export const HoagieSchema = SchemaFactory.createForClass(Hoagie)
