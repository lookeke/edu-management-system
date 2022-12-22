import { Injectable } from '@nestjs/common'

import { StudentService } from '../student/student.service'
import { TeacherService } from '../teacher/teacher.service'
import { AdminService } from '../admin/admin.service'

import { IStudent } from '../student/interface/user'
import { ITeacher } from '../teacher/interface/user'
import { IAdmin } from '../admin/interface/user'

import { PublicError } from '../types/publicError'

@Injectable()
export class ProfileService {
	constructor (
		private readonly userStudentService: StudentService,
		private readonly userTeacherService: TeacherService,
		private readonly userAdminService: AdminService,
	) {}

	private async find (role: number, userId: string): Promise<IStudent | ITeacher | IAdmin | PublicError> {
		switch (role) {
			case 0:
				return this.userAdminService.findUser(userId)
			case 1:
				return this.userTeacherService.findUser(userId)
			case 2:
				return this.userStudentService.findUser(userId)
			default:
				return {
					msg: '传递错误的role',
					status: 400,
				}
		}
	}

	public async findUser(role:number, userId:string): Promise<IStudent | ITeacher | IAdmin | PublicError> {
		console.log('profileService',role, userId)
		return this.find(role, userId)
	}
}
