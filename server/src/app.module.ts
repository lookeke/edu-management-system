import { ConfigModule } from '@nestjs/config'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

// controller list Start
import { AppController } from './app.controller'
// controller list End

// 中间件 middleware list Start
import { EncryptMiddleware } from './middleware/encrypt/encrypt.middleware'
// 中间件 middleware list End

// 模块 module list Start
import { UserModule } from './user/user.module'
import { RouterModule } from './router/router.module'
import { AuthModule } from './auth/auth.module'
import { StudentModule } from './student/student.module'
import { TeacherModule } from './teacher/teacher.module'
import { AdminModule } from './admin/admin.module'
import { ProfileModule } from './profile/profile.module'
// 模块 module list End

import { DATABASE } from './config/conn' // database config

// 通过脚本指令更改运行时加载的环境变量文件
const envFilePath = ['.env']
// 定义初始环境为开发环境
export const IS_DEV = process.env.RUNNING_ENV !== 'prod'
// 环境切换
if (IS_DEV) {
	// 切换到并优先加载开发环境文件
	envFilePath.unshift('.env.development')
}
else {
	// 切换到并优先加载生产环境文件
	envFilePath.unshift('.env.production')
}

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath,
		}),
		MongooseModule.forRootAsync({
			useFactory:()=>({
				uri: DATABASE
			})
		}),
		UserModule,
		RouterModule,
		AuthModule,
		StudentModule,
		TeacherModule,
		AdminModule,
		ProfileModule
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule implements NestModule {
	public configure (consumer: MiddlewareConsumer) {
		consumer
			.apply(EncryptMiddleware)
			.forRoutes('auth/login')
	}
}
