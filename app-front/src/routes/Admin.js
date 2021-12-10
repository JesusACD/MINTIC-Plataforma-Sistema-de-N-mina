import { Route, Routes } from 'react-router';
import Contenido from '../componentes/Contenido';
import CrearEmpleado from '../vistas/admin/CrearEmpleado';
import CrearUsuarioNomina from '../vistas/admin/CrearUsuarioNomina';
import ListarEmpleados from '../vistas/admin/ListarEmpleados';
import ListarUserNomina from '../vistas/admin/ListarUserNomina';

const Admin = () => {
	return (
		<Routes>
			<Route path='/admin-crear-empleados' element={<CrearEmpleado />} />
			<Route
				path='/admin-crear-nominas'
				element={<CrearUsuarioNomina />}
				
			/>
			<Route
				path='/admin-listar-empleados'
				element={<ListarEmpleados />}
			/>
			<Route
				path='/admin-listar-nomina'
				element={<ListarUserNomina />}
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
