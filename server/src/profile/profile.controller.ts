import { Body, Controller, Post } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { FindUserDto } from '../dto/findUser.dto'

import { IStudent } from '../student/interface/user'
import { ITeacher } from '../teacher/interface/user'
import { IAdmin } from '../admin/interface/user'

import { PublicError } from '../types/publicError'

@Controller('profile')
export class ProfileController {
	constructor (private readonly profileService: ProfileService) {}
	@Post()
	findUser(@Body() body: FindUserDto): Promise<IStudent | ITeacher | IAdmin | PublicError> {
		const { userId, role } = body
		return this.profileService.findUser(role, userId)
	}
}
