import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type CommentDocument = HydratedDocument<Comment>

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Comment {
  @Prop({ required: true })
  text!: string

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: 'Hoagie', required: true })
  hoagieId!: Types.ObjectId

  @Prop()
  createdAt!: Date
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
