import { Module } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { ProfileController } from './profile.controller'

import { StudentModule } from '../student/student.module'
import { TeacherModule } from '../teacher/teacher.module'
import { AdminModule } from '../admin/admin.module'

@Module({
	imports: [StudentModule, TeacherModule, AdminModule],
	providers: [ProfileService],
	controllers: [ProfileController],
})
export class ProfileModule {}
