import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Shop } from '../shops/shops.model'
import { User } from '../users/users.model'

export type ReviewDocument = HydratedDocument<Review>

@Schema({
	timestamps: true
})
export class Review {
	@Prop()
	message: string

	@Prop()
	starCount: number

	@Prop()
	media: string[]

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
	shop: Shop

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	user: User
}

export const ReviewSchema = SchemaFactory.createForClass(Review)
