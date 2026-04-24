const API: string = 'https://helminthoid-clumsily-xuan.ngrok-free.dev'

const HEADERS: HeadersInit = {
	'Content-Type': 'application/x-www-form-urlencoded',
	'ngrok-skip-browser-warning': 'true',
}

export interface LoginRequest {
	username: string
	password: string
}

export interface LoginResponse {
	access_token: string
	token_type: string
}
export interface ErrorResponse {
	detail?: string
}

export const loginUser = async (body: LoginRequest): Promise<LoginResponse> => {
	const res = await fetch(`${API}/user/login`, {
		method: 'POST',
		headers: HEADERS,
		body: new URLSearchParams({
			username: body.username,
			password: body.password,
		}),
	})

	const data: LoginResponse = await res.json()
	// Set localStorage item to indicate that the user is logged in
	localStorage.setItem('access_token', data.access_token)

	if (!res.ok) {
		throw new Error((data as ErrorResponse).detail || 'Login error')
	}

	return data as LoginResponse
}

