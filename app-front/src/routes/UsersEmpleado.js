import { Route, Routes } from 'react-router';
import Contenido from '../componentes/Contenido';
import DescargarDocumentos from '../vistas/admin/DescargarDocumentos';
import MostrarDatos from '../vistas/users/MostrarDatos';
import UserDatos from '../vistas/users/UserDatos';
import Vacaciones from '../vistas/users/Vacaciones';

const UsersEmpleado = () => {
	return (
		<Routes>
			{console.log('estamos dentro de empleados')}
			<Route path='/mis-datos' element={<MostrarDatos />} />

			<Route
				path='/descargar-reporte-pago'
				element={
					<DescargarDocumentos
						title='Descargar Reporte de Pago'
						boton='Descargar'
					/>
				}
			/>
			<Route
				path='/solicitar-certificado-laboral'
				element={
					<DescargarDocumentos
						title='Solicitar Certificado Laboral'
						boton='Solicitar'
					/>
				}
			/>
			<Route path='/solicitar-vacaciones' element={<Vacaciones />} />
			<Route
				path='/solicitar-permisos'
				element={
					<DescargarDocumentos
						title='Solicitar Permisos'
						boton='Solicitar'
					/>
				}
			/>
		</Routes>
	);
};

export default UsersEmpleado;
