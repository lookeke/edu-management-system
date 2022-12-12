import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterSchema } from '../schemas/router.schema';
import { RouterController } from './router.controller';
import { RouterService } from './router.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Route', schema: RouterSchema }]),
	],
	controllers: [RouterController],
	providers: [RouterService],
})
export class RouterModule {}
