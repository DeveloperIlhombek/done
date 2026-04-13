function Header() {
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
			</div>
		</div>
	)
}

export default Header
