import { Route, Routes } from 'react-router';
import Contenido from '../componentes/Contenido';

const UsersNomina = () => {
	return (
		<Routes>
			<Route
				path='/crear-empleados'
				element={
					<Contenido
						titulo='Este es mi home de user nomina'
						user='user-nomina'
					/>
				}
			/>
			<Route
				path='/permiso-empleados'
				element={
					<Contenido
						titulo='Contenido para Gestionar Usuarios'
						user='user-nomina'
					/>
				}
			/>
			<Route
				path='/vacaciones-empleados'
				element={
					<Contenido
						titulo='Gestionar los usarios nomina'
						user='user-nomina'
					/>
				}
			/>
			<Route
				path='/reportes'
				element={
					<Contenido
						titulo='Contenido para los usuarios Nomina'
						user='user-nomina'
					/>
				}
			/>
		</Routes>
	);
};

export default UsersNomina;
