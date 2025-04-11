import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export interface HoagieCommentProps {
  text: string
  userId: UniqueEntityID
  hoagieId: UniqueEntityID
  createdAt: Date
}

export class HoagieComment extends Entity<HoagieCommentProps> {
  get text() {
    return this.props.text
  }

  set text(text: string) {
    this.props.text = text
  }

  get userId() {
    return this.props.userId
  }

  get hoagieId() {
    return this.props.hoagieId
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<HoagieCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const hoagieComment = new HoagieComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return hoagieComment
  }
}
