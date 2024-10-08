import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Country } from '../countries/countries.model'
import { Category } from '../categories/categories.model'

export type ShopDocument = HydratedDocument<Shop>

@Schema({
	timestamps: true
})
export class Shop {
	@Prop()
	name: string

	@Prop()
	commissionPercentage: number

	@Prop()
	deliveryDay: number

	@Prop()
	logoPath: string

	@Prop()
	bannerPath: string

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Country.name }] })
	countries: Country[]

	@Prop({
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }]
	})
	categories: Category[]
}

export const ShopSchema = SchemaFactory.createForClass(Shop)
