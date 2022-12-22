import { Module } from '@nestjs/common'
import { TeacherController } from './teacher.controller'
import { TeacherService } from './teacher.service'
import { MongooseModule } from '@nestjs/mongoose'
import { TeacherSchema } from '../schemas/user_teacher.schema'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'User_teacher', schema: TeacherSchema, }]),
	],
  controllers: [TeacherController],
  providers: [TeacherService],
	exports: [TeacherService]
})
export class TeacherModule {}
