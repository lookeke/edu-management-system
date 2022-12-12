import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { FindOneDto } from '../user/dto/findOne.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	find(@Body() body: FindOneDto) {
		console.log(body);
		return this.userService.find(body.id, body.password);
	}
}
