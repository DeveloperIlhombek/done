import { useEffect, useState } from 'react'
import { getMe } from '../../services/user'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../ui/sheet'

function Header() {
	const [username, setUsername] = useState<string>()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem('access_token')
				if (token) {
					const user = await getMe(token)
					setUsername(user.username)
				}
			} catch (error) {
				console.error('Failed to fetch user:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchUser()
	}, [])

	return (
		// TODO: Header with logo and nav links
		<div className='h-24 m-0 p-0 w-screen block border-2 bg-teal-400 sticky top-0'>
			<div className='flex items-center justify-start gap-12 h-full p-4'>
				<div className='text-xl font-bold'>DO.ne</div>
				<div className='flex space-x-4'>
					<a
						href='/'
						className='hover:underline  border-2 rounded-2xl px-4 py-2 bg-white text-gray-800'
					>
						Dashboard
					</a>
					<a
						href='/login'
						className='hover:underline  border-2 rounded-2xl px-4 py-2 bg-white text-gray-800'
					>
						Log in
					</a>
					<a
						href='/register'
						className='hover:underline  border-2 rounded-2xl px-4 py-2 bg-white text-gray-800'
					>
						Register
					</a>
					<a
						href='/add'
						className='hover:underline  border-2 rounded-2xl px-4 py-2 bg-white text-gray-800'
					>
						➕Add
					</a>
					<a
						href='/edit'
						className='hover:underline  border-2 rounded-2xl px-4 py-2 bg-white text-gray-800'
					>
						✏️Edit
					</a>
					<a
						href='/delete'
						className='hover:underline  border-2 rounded-2xl px-4 py-2 bg-white text-gray-800'
					>
						🗑️Delete
					</a>
				</div>

				<Sheet>
					<SheetTrigger className='bg-blue-400 text-red-400'>
						{loading ? 'Loading...' : username ? username : 'Profile'}
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>
								{username ? `${username}'s Profile` : 'Profile'}
							</SheetTitle>
							<SheetDescription>User information and settings</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	)
}

export default Header
