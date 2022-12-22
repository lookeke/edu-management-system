import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type StudentDocument = HydratedDocument<Student>

@Schema()
export class Student {
	@Prop()
	avatar: string

	@Prop()
	class: string

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
	profession: string

	@Prop()
	tel: string

	@Prop()
	uid: string

	@Prop()
	username: string
}

export const StudentSchema = SchemaFactory.createForClass(Student)
