import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type RequestDocument = HydratedDocument<Request>

@Schema({
	timestamps: true
})
export class Request {
	@Prop()
	url: string

	@Prop()
	comment: string

	@Prop()
	media?: string[]
}

export const RequestSchema = SchemaFactory.createForClass(Request)
