import { Route, Routes } from 'react-router';
import Contenido from '../componentes/Contenido';
import MostrarDatos from '../vistas/users/MostrarDatos';
import UserDatos from '../vistas/users/UserDatos';
import Vacaciones from '../vistas/users/Vacaciones';

const UsersEmpleado = () => {
	return (
		<Routes>
			{console.log('estamos dentro de empleados')}
			<Route path='/mis-datos' element={<MostrarDatos />} />
			<Route path='/solicitar-vacaciones' element={<Vacaciones />} />
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
