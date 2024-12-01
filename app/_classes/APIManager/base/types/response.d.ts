/* eslint-disable @typescript-eslint/no-explicit-any */
import type { errors } from "@/data/locales/en-US";
import { RequestMethod } from "./request.types";

export type ApiResponse<U extends RequestMethod> = (
	U extends "auth-signin:post"
	? any
	: object) & { message?: keyof typeof errors }

export type UserResponse = {
	id: string;
	username: string;
	email: string;
	verified: boolean;
	userProfile: { icon: string };
}
