import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Role } from '../roles/roles.model'

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
}

export const UserSchema = SchemaFactory.createForClass(User)
