import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { User } from '../users/users.model'

export type RoleDocument = HydratedDocument<Role>

@Schema({
	timestamps: true
})
export class Role {
	@Prop()
	name: string

	@Prop()
	level: number

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
	users: User[]
}

export const RoleSchema = SchemaFactory.createForClass(Role)
