import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User, UserDocument } from '../schemas/user.schema'

import { IUser } from './interface/user'

@Injectable()
export class UserService {
	constructor (@InjectModel(User.name) private userModel: Model<UserDocument>) {}
	/**
	 * @description  根据id查询用户
	 * @since 18/12/2022下午11:21
	 * @param userId { string } 用户账号
	 * @return void
	 *  */
	async findOne (userId: string): Promise<IUser> {
		return this.userModel.findOne(
			{ id: userId },
			{ _id: 0 },
		)
	}
}
