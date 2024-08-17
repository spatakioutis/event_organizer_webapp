import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import ProfilePage from './pages/profilePage'
import EventPage from './pages/eventPage'

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
				<Route 
					path="/events/:eventId" 
					element={<EventPage />}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
