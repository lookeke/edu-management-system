import { Body, Controller, Post } from '@nestjs/common'
import { RouterService } from './router.service'
import { CreateRouterDto } from './dto/createRouter.dto'

@Controller('router')
export class RouterController {
	constructor(private readonly routerService: RouterService) {}

	@Post()
	createRouter(@Body() router: CreateRouterDto) {
		console.log(router)
		return this.routerService.createRouter(router.role)
	}
}
