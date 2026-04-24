const API: string = 'https://helminthoid-clumsily-xuan.ngrok-free.dev'

const HEADERS: HeadersInit = {
	'Content-Type': 'application/json',
	'ngrok-skip-browser-warning': 'true',
}

export interface ITaskRequest {
	title: string
	description: string
}

export interface ITaskResponse {
	id: number
	title: string
	description: string
	completed: boolean
	owner_id: number
	created_at: string
}

export const createTask = async (
	body: ITaskRequest,
	token: string,
): Promise<ITaskResponse> => {
	const res = await fetch(`${API}/tasks`, {
		method: 'POST',
		headers: {
			...HEADERS,
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	})
	const data: ITaskResponse = await res.json()

	if (!res.ok) {
		throw new Error('Failed to create task')
	}
	return data as ITaskResponse
}

export const getTasks = async (token: string): Promise<ITaskResponse[]> => {
	const res = await fetch(
		`${API}/tasks/?skip=0&limit=10&completed=false&sort_desc=false`,
		{
			method: 'GET',
			headers: {
				...HEADERS,
				Authorization: `Bearer ${token}`,
			},
		},
	)
	const data: ITaskResponse[] = await res.json()

	if (!res.ok) {
		throw new Error('Failed to fetch tasks')
	}
	return data as ITaskResponse[]
}
