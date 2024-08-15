import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import ProfilePage from './pages/profilePage'

const App = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route 
					path='/'
					element={<Navigate to="/login" replace/>}
				/>
				<Route 
					path="/login" 
					element={<LoginPage />}
				/>
				<Route 
					path="/home" 
					element={<HomePage />}
				/>
				<Route 
					path="/profile/:userId" 
					element={<ProfilePage />}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
