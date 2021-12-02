import { Route, Routes } from 'react-router';
import Contenido from '../componentes/Contenido';

const UsersEmpleado = () => {
	return (
		<Routes>
			{console.log('estamos dentro de empleados')}
			<Route
				path='/mis-datos'
				element={
					<Contenido
						titulo='Datos de empleado'
						user='user-empleado'
					/>
				}
			/>
			<Route
				path='/solicitar-vacaciones'
				element={
					<Contenido
						titulo='Contenido para Gestionar Usuarios'
						user='user-empleado'
					/>
				}
			/>
			<Route
				path='/descargar-reporte-pago'
				element={
					<Contenido
						titulo='Gestionar los usarios nomina'
						user='user-empleado'
					/>
				}
			/>
			<Route
				path='/solicitar-certificado-laboral'
				element={
					<Contenido
						titulo='Contenido para los usuarios empleados'
						user='user-empleado'
					/>
				}
			/>
			<Route
				path='/solicitar-vacaciones'
				element={
					<Contenido
						titulo='Gestionar la nomina'
						user='user-empleado'
					/>
				}
			/>
			<Route
				path='/solicitar-permisos'
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
