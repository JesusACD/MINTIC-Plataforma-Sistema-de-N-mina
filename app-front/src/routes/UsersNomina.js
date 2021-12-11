import { Route, Routes } from 'react-router';
import Contenido from '../componentes/Contenido';
import CrearEmpleado from '../componentes/CrearEmpleado';
import ListarUsuarios from '../componentes/ListarUsuarios';
import MostrarDatos from '../vistas/users/MostrarDatos';

const UsersNomina = () => {
	return (
		<Routes>
			<Route path='/datos-user-nomina' element={<MostrarDatos />} />
			<Route path='/crear-empleados' element={<CrearEmpleado />} />
			<Route
				path='/listar-empleados'
				element={<ListarUsuarios user='user-empleado' />}
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
