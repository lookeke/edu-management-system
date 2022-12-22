import { Body, Controller, Post } from '@nestjs/common'
import { FindUserDto } from '../dto/findUser.dto'
import { TeacherService } from './teacher.service'

@Controller('teacher')
export class TeacherController {
	constructor (private readonly teacherService: TeacherService) {}

	@Post()
	findUser (@Body() body: FindUserDto) {
		const { userId } = body
		return this.teacherService.findUser(userId)
	}
}
