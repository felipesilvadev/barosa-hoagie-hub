import { Types } from 'mongoose'

export class ObjectIdGenerator {
  static generate(): string {
    return new Types.ObjectId().toHexString()
  }
}
