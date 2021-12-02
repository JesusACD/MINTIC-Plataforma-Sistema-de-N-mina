import { Route, Routes } from 'react-router';
import Contenido from '../componentes/Contenido';

const UsersEmpleado = () => {
	return (
		<Routes>
			{console.log('estamos dentro de empleados')}
			<Route
				path='/home'
				element={
					<Contenido
						titulo='Este es mi home de user empleado'
						user='user-empleado'
					/>
				}
			/>
			<Route
				path='/gestion-usuario'
				element={
					<Contenido
						titulo='Contenido para Gestionar Usuarios'
						user='user-empleado'
					/>
				}
			/>
			<Route
				path='/usuario-nomina'
				element={
					<Contenido
						titulo='Gestionar los usarios nomina'
						user='user-empleado'
					/>
				}
			/>
			<Route
				path='/usuario-empleado'
				element={
					<Contenido
						titulo='Contenido para los usuarios empleados'
						user='user-empleado'
					/>
				}
			/>
			<Route
				path='/gestion-nomina'
				element={
					<Contenido
						titulo='Gestionar la nomina'
						user='user-empleado'
					/>
				}
			/>
		</Routes>
	);
};

export default UsersEmpleado;
