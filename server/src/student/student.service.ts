import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { StudentDocument } from '../schemas/user_student.schema'
import { IStudent } from './interface/user'

@Injectable()
export class StudentService {
	constructor (@InjectModel('User_student') private userStudentModel: Model<StudentDocument>) {}

	public async findUser(userId: string): Promise<IStudent> {
		return this.userStudentModel.findOne(
			{ uid: userId },
			{ _id: 0 }
		)
	}
}
