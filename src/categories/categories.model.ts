import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Shop } from '../shops/shops.model'

export type CategoryDocument = HydratedDocument<Category>

@Schema({
	timestamps: true
})
export class Category {
	@Prop()
	name: string

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }] })
	shops: Shop[]
}

export const CategorySchema = SchemaFactory.createForClass(Category)
