import axios from 'axios';
import { useContext } from 'react';
import { DatosDeUsuario } from '../context/UserContext';

const ListarPermisos = ({ type }) => {
	const {
		user,
		listvacaciones,
		listpermisos,
		setActivarVacaciones,
		setActivarPermisos,
	} = useContext(DatosDeUsuario);

	const solicitarPermiso = async (id) => {
		const parametro =
			type === 'vacaciones'
				? 'user/approve-vacation'
				: 'user/approve-permission';
		const url = `https://app-nomina-project.herokuapp.com/${parametro}/${id}`;
		const token = user.data.token;

		try {
			await axios.get(url, {
				headers: {
					'access-token': token,
				},
			});
			setActivarVacaciones(true);
			setActivarPermisos(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className='w-50 p-3 mt-2'>
				<h2>
					Solicitudes de{' '}
					{type === 'vacaciones' ? 'Vacaciones' : 'Permisos'}
				</h2>
				<table class='table table-striped'>
					<thead>
						<tr>
							<th scope='col'>Nombre</th>
							<th scope='col'>Apellido</th>
						</tr>
					</thead>
					<tbody>
						{type === 'vacaciones'
							? listvacaciones.vacaciones.map((e) => (
									<tr>
										<td>{e.nombre}</td>
										<td>{e.apellido}</td>
										<td>{e.email}</td>
										<td>
											<button
												type='button'
												class='btn btn-success'
												onClick={() =>
													solicitarPermiso(e._id)
												}>
												Aceptar
											</button>
										</td>
									</tr>
							  ))
							: listpermisos.permisos.map((e) => (
									<tr>
										<td>{e.nombre}</td>
										<td>{e.apellido}</td>
										<td>{e.email}</td>
										<td>
											<button
												type='button'
												class='btn btn-success'
												onClick={() =>
													solicitarPermiso(e._id)
												}>
												Aceptar
											</button>
										</td>
									</tr>
							  ))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default ListarPermisos;
