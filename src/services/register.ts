// config/api.ts

export const IS_LOCAL: boolean =
	window.location.hostname === '127.0.0.1' ||
	window.location.hostname === 'localhost'

export const API: string = IS_LOCAL
	? 'https://helminthoid-clumsily-xuan.ngrok-free.dev'
	: 'https://helminthoid-clumsily-xuan.ngrok-free.dev'

export const HEADERS: HeadersInit = {
	'Content-Type': 'application/json',
	'ngrok-skip-browser-warning': 'true',
}

// types/auth.ts

export interface RegisterRequest {
	username: string
	password: string
}

export interface RegisterResponse {
	id: number
	username: string
}

export interface ErrorResponse {
	detail?: string
}

export const registerUser = async (
	body: RegisterRequest,
): Promise<RegisterResponse> => {
	const res = await fetch(`${API}/user/register`, {
		method: 'POST',
		headers: HEADERS,
		body: JSON.stringify(body),
	})

	const data: RegisterResponse | ErrorResponse = await res.json()

	if (!res.ok) {
		throw new Error((data as ErrorResponse).detail || 'Register error')
	}

	return data as RegisterResponse
}
