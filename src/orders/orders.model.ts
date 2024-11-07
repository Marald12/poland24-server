import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { User } from '../users/users.model'
import { Shop } from '../shops/shops.model'

export type OrderDocument = HydratedDocument<Order>

@Schema({
	timestamps: true
})
export class Order {
	@Prop()
	url: string

	@Prop()
	count: number

	@Prop()
	price: number

	@Prop()
	deliveryPrice: number

	@Prop()
	description: string

	@Prop()
	socialType: 'viber' | 'telegram' | 'email'

	@Prop()
	name?: string

	@Prop()
	surname?: string

	@Prop()
	phoneNumber?: string

	@Prop()
	email?: string

	@Prop()
	comment?: string

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	user: User

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
	shop: Shop

	@Prop()
	isUsed: boolean

	@Prop()
	summa: number

	@Prop({ default: 'Комплектуется' })
	status: 'Выполнен' | 'Комплектуется' | 'Отменен' | 'Не выполнен'

	@Prop()
	invoice?: string

	@Prop()
	prepayment?: number
}

export const OrderSchema = SchemaFactory.createForClass(Order)
