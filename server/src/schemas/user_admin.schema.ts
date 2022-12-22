import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type AdminDocument = HydratedDocument<Admin>

@Schema()
export class Admin {
	@Prop()
	avatar: string

	@Prop()
	tel: string

	@Prop()
	uid: string

	@Prop()
	username: string
}

export const AdminSchema = SchemaFactory.createForClass(Admin)
