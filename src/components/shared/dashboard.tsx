import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import { getTasks, type ITaskResponse } from '../../services/task'
import { Button } from '../ui/button'
import Header from './header'

const categories = [
	{
		icon: '📚',
		name: 'Barcha sahifalar',
		count: 12,
	},
	{
		icon: '⭐',
		name: 'Muhimlar',
		count: 5,
	},
	{
		icon: '📅',
		name: 'Bugun',
		count: 3,
	},
	{
		icon: '✅',
		name: 'Bajarilgan',
		count: 7,
	},
	{
		icon: '💼',
		name: 'Ish',
		count: 2,
	},
	{
		icon: '📖',
		name: "O'qish",
		count: 6,
	},
	{
		icon: '🏠',
		name: 'Shaxsiy',
		count: 4,
	},
]

const stats = [
	{
		count: 12,
		title: 'Jami vazifa',
		icon: '📋',
		color: 'bg-blue-600',
		value: '+3 bu hafta',
	},
	{
		count: 5,
		title: 'Bajarildi',
		icon: '✅',
		color: 'bg-green-600',
		value: '+2 bugun',
	},
	{
		count: 7,
		title: 'Jami vazifa',
		icon: '⏳',
		color: 'bg-orange-600',
		value: '5 ta bugun',
	},
	{
		count: 3,
		title: 'Yuqori muhim',
		icon: '🔥',
		color: 'bg-red-600',
		value: 'Tezda!',
	},
]

function Dashboard() {
	const [tasks, settasks] = useState<ITaskResponse[]>([])
	useEffect(() => {
		const token = localStorage.getItem('access_token') as string
		const fetchtask = async () => {
			const responce = await getTasks(token)
			settasks(responce)
		}
		fetchtask()
	}, [])
	return (
		<>
			<Header />
			<section className='grid grid-cols-5 h-[85vh] w-screen p-0 m-0'>
				<div className='col-span-1 bg-teal-400 px-3'>
					<h1 className='text-xl font-bold'>DO.ne</h1>
					<div className='flex items-start flex-col justify-start'>
						{categories.map((category, index) => (
							<div
								key={index}
								className='flex items-center justify-between gap-2 my-4 p-2 rounded-lg hover:bg-sky-300 cursor-pointer'
							>
								<span className='text-2xl'>{category.icon}</span>
								<span>{category.name}</span>
								<span className='ml-auto text-sm bg-white text-gray-800 px-2 py-1 rounded-full'>
									{category.count}
								</span>
							</div>
						))}
					</div>
				</div>
				<div className='col-span-4 bg-teal-800 px-4 py-6'>
					<div className='flex justify-between items-center'>
						<div>
							<h1>Barcha Vazifalar 👋</h1>
							<p>Bugun 5 ta vazifa bajarishingiz kerak</p>
						</div>
						<Button>Qo'shish</Button>
					</div>
					<div className='grid grid-cols-4 gap-4 '>
						{stats.map((item, ind) => (
							<div
								key={ind}
								className={cn(
									`col-span-1 rounded-xl border-2 flex px-2 py-5 justify-between my-5 ${item.color}`,
								)}
							>
								<div className='flex flex-col justify-center items-start'>
									<span className='font-bold text-4xl text-white'>
										{item.count}
									</span>
									<span>{item.title}</span>
								</div>
								<div className='flex flex-col justify-center items-start'>
									<span>{item.icon}</span>
									<span>{item.value}</span>
								</div>
							</div>
						))}
					</div>

					{tasks &&
						tasks.map((vazifa, ind) => {
							return (
								<div key={ind}>
									<h1 className='text-gray-100'> {vazifa.title}</h1>
									<p className='text-gray-300'>{vazifa.created_at}</p>
								</div>
							)
						})}
				</div>
			</section>
		</>
	)
}

export default Dashboard
