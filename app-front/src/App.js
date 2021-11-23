import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Contenido from './componentes/Contenido';
import Sidebar from './componentes/Sidebar';
import TopNavegacion from './componentes/TopNavegacion';

function App() {
	return (
		<div className='d-flex' id='wrapper'>
			{/* Sidebar */}
			<Sidebar />

			<div id='page-content-wrapper'>
				{/* Menu de navegacion */}
				<TopNavegacion />

				{/* Contenido por pestaña */}
				<Contenido />
			</div>
		</div>
	);
}

export default App;
