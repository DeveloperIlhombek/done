const API: string = 'https://helminthoid-clumsily-xuan.ngrok-free.dev'

export interface IGetMeResponse {
	username: string
	password: string
	id: number
}

export const getMe = async (token: string) => {
	const res = await fetch(`${API}/user/me`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'ngrok-skip-browser-warning': 'true',
		},
	})
	return res.json() as Promise<IGetMeResponse>
}
