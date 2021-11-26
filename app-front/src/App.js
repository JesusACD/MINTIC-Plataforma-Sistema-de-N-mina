import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contenido from './componentes/Contenido';
import ContenidoDos from './componentes/ContenidoDos';
import Sidebar from './componentes/Sidebar';
import TopNavegacion from './componentes/TopNavegacion';

function App() {
	return (
		<div className='d-flex' id='wrapper'>
			<BrowserRouter>
				<Sidebar />
				<div id='page-content-wrapper'>
					{/* Menu de navegacion */}
					<TopNavegacion />
					<Routes>
						<Route path='/gestion-usuario' element={<Contenido titulo="Contenido para Gestionar Usuarios" />} />
						<Route path='/usuario-nomina' element={<Contenido titulo="Gestionar los usarios nomina" />} />
						<Route path='/usuario-empleado' element={<Contenido titulo="Contenido para los usuarios empleados" />} />
						<Route path='/gestion-nomina' element={<Contenido titulo="Gestionar la nomina" />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
