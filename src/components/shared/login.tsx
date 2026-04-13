import { useState, type ChangeEvent, type FormEvent } from 'react'
import { loginUser, type LoginRequest } from '../../services/login'

const Login = () => {
	const [form, setForm] = useState<LoginRequest>({
		username: '',
		password: '',
	})

	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError('')

		try {
			await loginUser(form)

			// redirect
			window.location.href = '/login'
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-linear-to-r from-[#6f5ce6] via-[#b247fd] to-[#4f41ff] p-6'>
			<div className='w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8'>
				<div className='mb-7'>
					<h1 className='text-3xl md:text-4xl font-extrabold text-[#2b2781]'>
						Hisobga kirish
					</h1>
					<p className='mt-2 text-sm text-[#6f6f9a]'>
						Allaqachon hisobingiz bormi?{' '}
						<a
							href='/login'
							className='font-semibold text-[#7233f2] hover:text-[#5023d1]'
						>
							Kiring →
						</a>
					</p>
				</div>

				<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
					<label className='text-sm font-semibold text-[#4a4a7a]'>
						Username
					</label>
					<input
						name='username'
						value={form.username}
						onChange={handleChange}
						placeholder='Username'
						className='w-full rounded-xl border border-[#d9d9f5] px-4 py-3 text-base text-[#2f2f5d] outline-none transition focus:border-[#7d45ef] focus:ring-2 focus:ring-[#cdb5ff]/40'
						autoComplete='username'
					/>

					<label className='text-sm font-semibold text-[#4a4a7a]'>Parol</label>
					<input
						name='password'
						type='password'
						value={form.password}
						onChange={handleChange}
						placeholder='Password'
						className='w-full rounded-xl border border-[#d9d9f5] px-4 py-3 text-base text-[#2f2f5d] outline-none transition focus:border-[#7d45ef] focus:ring-2 focus:ring-[#cdb5ff]/40'
						autoComplete='new-password'
					/>

					<button
						type='submit'
						disabled={loading}
						className='mt-2 rounded-xl bg-linear-to-r from-[#6e3be4] to-[#ae2bff] px-4 py-3 text-base font-bold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70'
					>
						{loading ? 'Yuklanmoqda...' : 'Tizimga kirish'}
					</button>

					{error && (
						<p className='mt-1 text-sm font-medium text-red-500'>{error}</p>
					)}
				</form>
			</div>
		</div>
	)
}

export default Login
