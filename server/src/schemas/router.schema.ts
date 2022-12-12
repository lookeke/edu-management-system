import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RouterDocument = HydratedDocument<Router>;

@Schema()
export class Router {
	@Prop([{ path: String, label: String }])
	items: { path: string; label: string }[];

	@Prop()
	role: number;
}

export const RouterSchema = SchemaFactory.createForClass(Router);
