import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AdminDocument } from '../schemas/user_admin.schema'

import { IAdmin } from './interface/user'

@Injectable()
export class AdminService {
	constructor (@InjectModel('User_admin') private userAdminModel: Model<AdminDocument>) {}

	public async findUser (userId: string): Promise<IAdmin> {
		return this.userAdminModel.findOne(
			{ uid: userId },
			{ _id: 0 }
		)
	}
}
