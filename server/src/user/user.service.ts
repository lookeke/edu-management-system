import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	// 根据id查询用户
	async find(id: string, password: string): Promise<any> {
		console.log(id, password);
		const profile = await this.userModel.findOne(
			{ id, password },
			{ _id: 0, password: 0 },
		);

		if (profile !== null) {
			return profile;
		}

		return {
			status: 404,
			msg: '账号或密码错误',
		};
	}
}
