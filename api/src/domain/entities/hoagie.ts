import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export interface HoagieProps {
  name: string
  ingredients: string[]
  picture?: string
  creatorId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date | null
}

export class Hoagie extends Entity<HoagieProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get ingredients() {
    return this.props.ingredients
  }

  set ingredients(ingredients: string[]) {
    this.props.ingredients = ingredients
    this.touch()
  }

  get picture() {
    return this.props.picture
  }

  set picture(picture: string | undefined | null) {
    if (picture === undefined || picture === null) {
      return
    }

    this.props.picture = picture
    this.touch()
  }

  get creatorId() {
    return this.props.creatorId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<HoagieProps, 'picture' | 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const hoagie = new Hoagie(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return hoagie
  }
}
