import { Route, Routes } from 'react-router';
import Contenido from '../componentes/Contenido';

const Admin = () => {
	return (
		<Routes>
			<Route
				path='/admin-crear-empleados'
				element={
					<Contenido
						titulo='Contenido para Gestionar Usuarios Admin'
						user='user-admin'
					/>
				}
			/>
			<Route
				path='/admin-crear-nominas'
				element={
					<Contenido
						titulo='Gestionar los usarios nomina'
						user='user-admin'
					/>
				}
			/>
			<Route
				path='/admin-listar-empleados'
				element={
					<Contenido
						titulo='Contenido para los usuarios empleados'
						user='user-admin'
					/>
				}
			/>
			<Route
				path='/admin-listar-nomina'
				element={
					<Contenido titulo='Gestionar la nomina' user='user-admin' />
				}
			/>
			<Route
				path='/admin-permiso-empleados'
				element={
					<Contenido titulo='Gestionar la nomina' user='user-admin' />
				}
			/>
			<Route
				path='/admin-vacaciones-empleados'
				element={
					<Contenido titulo='Gestionar la nomina' user='user-admin' />
				}
			/>
			<Route
				path='/admin-reportes'
				element={
					<Contenido titulo='Gestionar la nomina' user='user-admin' />
				}
			/>
		</Routes>
	);
};

export default Admin;
