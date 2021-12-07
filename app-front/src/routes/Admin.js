import { Route, Routes } from 'react-router';
import Contenido from '../componentes/Contenido';
import CrearEmpleado from '../vistas/admin/CrearEmpleado';
import ListarEmpleados from '../vistas/admin/ListarEmpleados';

const Admin = () => {
	return (
		<Routes>
			<Route path='/admin-crear-empleados' element={<CrearEmpleado />} />
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
				element={<ListarEmpleados />}
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
