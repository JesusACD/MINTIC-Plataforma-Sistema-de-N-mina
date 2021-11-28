import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contenido from './componentes/Contenido';
import Login from './componentes/Login';
import Sidebar from './componentes/Sidebar';
import TopNavegacion from './componentes/TopNavegacion';
import './App.css';

function App() {
	// Estado para el usuario logueado
	const [usuariologin, setUsuariologin] = useState(true);
	return (
		<BrowserRouter>
			{usuariologin ? (
				<Routes>
					<Route
						path='/login'
						element={<Login setUsuariologin={setUsuariologin} />}
					/>
				</Routes>
			) : (
				<div className='d-flex' id='wrapper'>
					<Sidebar />
					<div id='page-content-wrapper'>
						{/* Menu de navegacion */}
						<TopNavegacion />
						<Routes>
							<Route
								path='/gestion-usuario'
								element={
									<Contenido titulo='Contenido para Gestionar Usuarios' />
								}
							/>
							<Route
								path='/usuario-nomina'
								element={
									<Contenido titulo='Gestionar los usarios nomina' />
								}
							/>
							<Route
								path='/usuario-empleado'
								element={
									<Contenido titulo='Contenido para los usuarios empleados' />
								}
							/>
							<Route
								path='/gestion-nomina'
								element={
									<Contenido titulo='Gestionar la nomina' />
								}
							/>
						</Routes>
					</div>
				</div>
			)}
		</BrowserRouter>
	);
}

export default App;
