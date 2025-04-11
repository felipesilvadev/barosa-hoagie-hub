import { Types } from 'mongoose'

export type RefLike = string | Types.ObjectId | { _id: string | Types.ObjectId }

export function extractEntityId(ref: RefLike): string {
  if (
    typeof ref === 'object' &&
    ref !== null &&
    '_id' in ref &&
    (typeof ref._id === 'string' || ref._id instanceof Types.ObjectId)
  ) {
    return ref._id.toString()
  }

  return ref.toString()
}
