import { Route, Routes } from 'react-router';
import Contenido from '../componentes/Contenido';

const Admin = () => {
	return (
		<Routes>
			<Route
				path='/home'
				element={
					<Contenido titulo='Este es mi home de admin' user='admin' />
				}
			/>
			<Route
				path='/gestion-usuario'
				element={
					<Contenido
						titulo='Contenido para Gestionar Usuarios'
						user='admin'
					/>
				}
			/>
			<Route
				path='/usuario-nomina'
				element={
					<Contenido
						titulo='Gestionar los usarios nomina'
						user='admin'
					/>
				}
			/>
			<Route
				path='/usuario-empleado'
				element={
					<Contenido
						titulo='Contenido para los usuarios empleados'
						user='admin'
					/>
				}
			/>
			<Route
				path='/gestion-nomina'
				element={
					<Contenido titulo='Gestionar la nomina' user='admin' />
				}
			/>
		</Routes>
	);
};

export default Admin;
