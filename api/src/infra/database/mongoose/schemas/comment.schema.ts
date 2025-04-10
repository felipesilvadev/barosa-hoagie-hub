import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

import { User } from './user.schema'
import { Hoagie } from './hoagie.schema'

export type CommentDocument = HydratedDocument<Comment>

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Comment {
  @Prop({ required: true })
  text!: string

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user!: User

  @Prop({ type: Types.ObjectId, ref: 'Hoagie', required: true })
  hoagie!: Hoagie
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
