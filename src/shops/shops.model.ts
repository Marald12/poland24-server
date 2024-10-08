import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

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
}

export const ShopSchema = SchemaFactory.createForClass(Shop)
