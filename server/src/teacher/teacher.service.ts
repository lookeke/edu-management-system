import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { TeacherDocument } from '../schemas/user_teacher.schema'

import { ITeacher } from './interface/user'

@Injectable()
export class TeacherService {
	constructor (@InjectModel('User_teacher') private userTeacherModel: Model<TeacherDocument>) {}
	public async findUser(userId: string): Promise<ITeacher>{
		return this.userTeacherModel.findOne(
			{ uid: userId },
			{ _id: 0 }
		)
	}
}
