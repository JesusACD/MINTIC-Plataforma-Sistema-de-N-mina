import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './componentes/Login';
import Sidebar from './componentes/Sidebar';
import TopNavegacion from './componentes/TopNavegacion';
import './App.css';
import UsersEmpleado from './routes/UsersEmpleado';
import UsersNomina from './routes/UsersNomina';
import Admin from './routes/Admin';
import { getUserLocalStorage } from './helper';
import UserContextProvider from './context/UserContext';

function App() {
	// Estado para el usuario logueado
	// const [usuariologin, setUsuariologin] = useState(true);
	let userlogin = getUserLocalStorage() || false;
	const useractivo = localStorage.getItem('login') || false;

	let Component = {};
	if (userlogin.user === 'user-empleado') {
		Component.data = <UsersEmpleado />;
	} else if (userlogin.user === 'user-nomina') {
		Component.data = <UsersNomina />;
	} else if (userlogin.user === 'user-admin') {
		Component.data = <Admin />;
	} else {
		userlogin = null;
	}
	return (
		<UserContextProvider>
			<BrowserRouter>
				{!useractivo ? (
					<Routes>
						<Route
							exact
							path='/empleado-login'
							element={<Login user='user-empleado' />}
						/>
						<Route
							exact
							path='/nomina-login'
							element={<Login user='user-nomina' />}
						/>
						<Route
							exact
							path='/admin-login'
							element={<Login user='user-admin' />}
						/>
						<Route
							exact
							path='/'
							element={<Login user='user-empleado' />}
						/>
					</Routes>
				) : (
					<div className='d-flex' id='wrapper'>
						<Sidebar />
						<div id='page-content-wrapper'>
							{/* Menu de navegacion */}
							<TopNavegacion />
							{Component.data}
						</div>
					</div>
				)}
			</BrowserRouter>
		</UserContextProvider>
	);
}

export default App;
