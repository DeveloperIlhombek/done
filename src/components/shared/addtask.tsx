import { AlertCircle, CheckCircle2, Loader2, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { createTask, type ITaskRequest } from '../../services/task'

function Addtask() {
	const [isOpen, setIsOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

	const token = localStorage.getItem('access_token') || ''

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)

		if (!token) {
			setError('Authentication token not found. Please login first.')
			return
		}

		if (!title.trim()) {
			setError('Title is required')
			return
		}

		if (!description.trim()) {
			setError('Description is required')
			return
		}

		setIsLoading(true)

		try {
			const taskData: ITaskRequest = {
				title: title.trim(),
				description: description.trim(),
			}

			const response = await createTask(taskData, token)

			setSuccess(true)
			setTitle('')
			setDescription('')

			// Reset success message after 2 seconds
			setTimeout(() => {
				setSuccess(false)
				setIsOpen(false)
			}, 2000)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to create task')
		} finally {
			setIsLoading(false)
		}
	}

	const handleClose = () => {
		if (!isLoading) {
			setIsOpen(false)
			setTitle('')
			setDescription('')
			setError(null)
			setSuccess(false)
		}
	}

	return (
		<div className='relative'>
			{/* Add Task Button */}
			<button
				onClick={() => setIsOpen(true)}
				className='relative inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-linear-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95'
			>
				<Plus size={20} className='animate-pulse' />
				<span className='hidden sm:inline'>Add Task</span>
			</button>

			{/* Modal Overlay */}
			{isOpen && (
				<div
					className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fade-in'
					onClick={handleClose}
				/>
			)}

			{/* Modal Dialog */}
			<div
				className={`fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transition-all duration-300 transform ${
					isOpen
						? 'animate-in fade-in zoom-in-95 scale-100 opacity-100'
						: 'animate-out fade-out zoom-out-95 scale-95 opacity-0 pointer-events-none'
				}`}
			>
				<div className='bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800'>
					{/* Header */}
					<div className='bg-linear-to-r from-blue-500 to-blue-600 px-6 py-4 flex items-center justify-between'>
						<h2 className='text-xl font-bold text-white'>Create New Task</h2>
						<button
							title='Close'
							onClick={handleClose}
							disabled={isLoading}
							className='text-white hover:bg-white/20 rounded-lg p-1 transition-colors disabled:opacity-50'
						>
							<X size={20} />
						</button>
					</div>

					{/* Form Content */}
					<div className='p-6'>
						{success ? (
							// Success State
							<div className='flex flex-col items-center justify-center py-8 animate-in fade-in'>
								<div className='w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 animate-bounce'>
									<CheckCircle2
										size={32}
										className='text-green-600 dark:text-green-400'
									/>
								</div>
								<h3 className='text-lg font-semibold text-slate-900 dark:text-white mb-1'>
									Task Created!
								</h3>
								<p className='text-slate-600 dark:text-slate-400 text-center'>
									Your task has been added successfully
								</p>
							</div>
						) : (
							<form
								onSubmit={handleSubmit}
								className='space-y-5 animate-in fade-in'
							>
								{/* Title Input */}
								<div>
									<label className='block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2'>
										Task Title
									</label>
									<input
										type='text'
										value={title}
										onChange={e => setTitle(e.target.value)}
										placeholder='Enter task title'
										disabled={isLoading}
										className='w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50'
									/>
								</div>

								{/* Description Input */}
								<div>
									<label className='block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2'>
										Description
									</label>
									<textarea
										value={description}
										onChange={e => setDescription(e.target.value)}
										placeholder='Enter task description'
										disabled={isLoading}
										rows={4}
										className='w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50'
									/>
								</div>

								{/* Error Message */}
								{error && (
									<div className='flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-in slide-in-from-top-2'>
										<AlertCircle
											size={20}
											className='text-red-600 dark:text-red-400 shrink-0 mt-0.5'
										/>
										<p className='text-sm text-red-700 dark:text-red-400'>
											{error}
										</p>
									</div>
								)}

								{/* Action Buttons */}
								<div className='flex gap-3 pt-2'>
									<button
										type='button'
										onClick={handleClose}
										disabled={isLoading}
										className='flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200 disabled:opacity-50'
									>
										Cancel
									</button>
									<button
										type='submit'
										disabled={isLoading}
										className='flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 hover:scale-105 active:scale-95'
									>
										{isLoading ? (
											<>
												<Loader2 size={18} className='animate-spin' />
												Creating...
											</>
										) : (
											<>
												<Plus size={18} />
												Create Task
											</>
										)}
									</button>
								</div>
							</form>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Addtask
