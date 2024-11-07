import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Role } from '../roles/roles.model'
import { Order } from '../orders/orders.model'

export type UserDocument = HydratedDocument<User>

@Schema({
	timestamps: true
})
export class User {
	@Prop({ unique: true })
	email: string

	@Prop()
	password: string

	@Prop()
	name: string

	@Prop()
	surname: string

	@Prop()
	phoneNumber: number

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
	role: Role

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
	orders: Order[]
}

export const UserSchema = SchemaFactory.createForClass(User)
