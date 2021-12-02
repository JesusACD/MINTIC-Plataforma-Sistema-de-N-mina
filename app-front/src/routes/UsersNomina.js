import { Route, Routes } from 'react-router';
import Contenido from '../componentes/Contenido';

const UsersNomina = () => {
	return (
		<Routes>
			<Route
				path='/home'
				element={
					<Contenido
						titulo='Este es mi home de user nomina'
						user='user-nomina'
					/>
				}
			/>
			<Route
				path='/gestion-usuario'
				element={
					<Contenido
						titulo='Contenido para Gestionar Usuarios'
						user='user-nomina'
					/>
				}
			/>
			<Route
				path='/usuario-nomina'
				element={
					<Contenido
						titulo='Gestionar los usarios nomina'
						user='user-nomina'
					/>
				}
			/>
			<Route
				path='/usuario-empleado'
				element={
					<Contenido
						titulo='Contenido para los usuarios Nomina'
						user='user-nomina'
					/>
				}
			/>
			<Route
				path='/gestion-nomina'
				element={
					<Contenido
						titulo='Gestionar la nomina'
						user='user-nomina'
					/>
				}
			/>
		</Routes>
	);
};

export default UsersNomina;
