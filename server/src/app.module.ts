import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RouterModule } from './router/router.module';

// 通过脚本指令更改运行时加载的环境变量文件
const envFilePath = ['.env'];
// 定义初始环境为开发环境
export const IS_DEV = process.env.RUNNING_ENV !== 'prod';
// 环境切换
if (IS_DEV) {
	// 切换到并优先加载开发环境文件
	envFilePath.unshift('.env.development');
} else {
	// 切换到并优先加载生产环境文件
	envFilePath.unshift('.env.production');
}

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath,
		}),
		MongooseModule.forRoot(
			'mongodb://root:admin@192.168.0.152:27017/edu_system',
		),
		UserModule,
		RouterModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
