import { Body, Controller, Post } from '@nestjs/common'
import { FindUserDto } from '../dto/findUser.dto'
import { StudentService } from './student.service'

@Controller('student')
export class StudentController {
	constructor (private  readonly studentService: StudentService) {}
	@Post()
	findUser(@Body() body: FindUserDto) {
		const { userId } = body
		return this.studentService.findUser(userId)
	}
}
