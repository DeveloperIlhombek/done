import { Route, Routes } from 'react-router-dom'
import Addtask from './components/shared/addtask'
import Dashboard from './components/shared/dashboard'
import Deletetask from './components/shared/deletetask'
import Edittask from './components/shared/edittask'
import Login from './components/shared/login'
import Register from './components/shared/register'

function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/add' element={<Addtask />} />
				<Route path='/edit' element={<Edittask />} />
				<Route path='/delete' element={<Deletetask />} />
			</Routes>
		</div>
	)
}

export default App
