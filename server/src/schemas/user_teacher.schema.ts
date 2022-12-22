import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TeacherDocument = HydratedDocument<Teacher>

@Schema()
export class Teacher {
	@Prop()
	avatar: string

	@Prop()
	birthdate: string

	@Prop()
	college: string

	@Prop()
	gender: string

	@Prop()
	address: string

	@Prop()
	native_place: string

	@Prop()
	politics_status: string

	@Prop()
	tel: string

	@Prop()
	uid: string

	@Prop()
	username: string

	@Prop()
	office_date: string
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher)
