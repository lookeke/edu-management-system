import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { RouterDocument } from '../schemas/router.schema'
import { Router } from './router.interface'

@Injectable()
export class RouterService {
	constructor(
		@InjectModel('Route') private routerModel: Model<RouterDocument>,
	) {}

	async createRouter(role: number): Promise<{ router: Router }> {
		const router: Router = await this.routerModel.findOne(
			{ role },
			{ _id: 0 }
		)
		console.log(router)
		return {
			router,
		}
	}
}
