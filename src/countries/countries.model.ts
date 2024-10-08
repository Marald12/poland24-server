import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { HydratedDocument } from 'mongoose'
import { Shop } from '../shops/shops.model'

export type CountryDocument = HydratedDocument<Country>

@Schema({
	timestamps: true
})
export class Country {
	@Prop()
	name: string

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }] })
	shops: Shop[]
}

export const CountrySchema = SchemaFactory.createForClass(Country)
