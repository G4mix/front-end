export type SignupUserParams = {
	username: string
	email: string
	password: string
}

export type URL =
	"/auth/signin"

export type RequestMethod =
	"auth-signin:post"

export type RequestBody<U extends RequestMethod> =
	U extends "auth-signin:post"
	? Pick<SignupUserParams, "email" | "password">
	: undefined