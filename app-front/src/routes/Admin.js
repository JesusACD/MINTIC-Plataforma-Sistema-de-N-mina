import { Route, Routes } from 'react-router';
import Contenido from '../componentes/Contenido';
import CrearEmpleado from '../componentes/CrearEmpleado';
import ListarUsuarios from '../componentes/ListarUsuarios';
import CrearUsuarioNomina from '../vistas/admin/CrearUsuarioNomina';
import MostrarDatos from '../vistas/users/MostrarDatos';

const Admin = () => {
	return (
		<Routes>
			<Route path='/datos-user-admin' element={<MostrarDatos />} />
			<Route path='/admin-crear-empleados' element={<CrearEmpleado />} />
			<Route
				path='/admin-crear-nominas'
				element={<CrearUsuarioNomina />}
			/>
			<Route
				path='/admin-listar-empleados'
				element={<ListarUsuarios user='user-empleado' />}
			/>
			<Route
				path='/admin-listar-nomina'
				element={<ListarUsuarios user='user-nomina' />}
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
