import axios from 'axios';
import { useContext } from 'react';
import { DatosDeUsuario } from '../context/UserContext';

const ListarUsuarios = ({ userTabla }) => {
	const {
		result,
		resultempleado,
		user,
		actrualizarLista,
		actrualizarListaEmpleado,
	} = useContext(DatosDeUsuario);
	let res = {};

	if (userTabla === 'user-nomina') {
		res.usuarios = result;
	} else {
		res.usuarios = resultempleado;
	}
	const usuarios = res.usuarios;
	console.log('mis usuarios', usuarios);

	const desabilitarUser = async (id) => {
		let ur = {};
		if (userTabla === 'user-admin') {
			ur.url = 'https://app-nomina-project.herokuapp.com/admin/login';
		} else if (userTabla === 'user-empleado') {
			ur.url = `https://app-nomina-project.herokuapp.com/user/delete-employee/${id}`;
		} else {
			ur.url = `https://app-nomina-project.herokuapp.com/admin/delete-user/${id}`;
		}

		const url = ur.url;
		const token = JSON.parse(localStorage.getItem('user'));
		const data = {
			token,
		};

		try {
			console.log({ t: token.data.token });
			console.log(url);
			// return;
			const result = await axios.put(url, data, {
				headers: {
					'Content-Type': 'application/json',
					'access-token': token.data.token,
				},
			});
			console.log('abajo el resultado');
			console.log(result.data);
			actrualizarLista(true);
			actrualizarListaEmpleado(true);
		} catch (err) {
			console.log('salio u error', err);
		}
	};

	return (
		<div className='w-50 p-3 mt-2'>
			<h2>
				Listado de Usuarios{' '}
				{userTabla === 'user-empleado' ? 'Empleados' : 'Nomina'}
			</h2>
			<table className='table'>
				<thead>
					<tr>
						{/* <th scope='col'>#</th> */}
						<th scope='col'>Correo</th>
						{/* <th scope='col'>User</th> */}
						<th scope='col'>Nombre</th>
						<th scope='col'>Apellido</th>
						<th scope='col'>Teléfono</th>
						<th scope='col'>Cédula</th>
						{userTabla === 'user-empleado' ? (
							<>
								<th scope='col'>Cargo</th>
								<th scope='col'>Salario</th>
								<th scope='col'>Fecha de Contratación</th>
								<th scope='col'>Aprobar Vacaciones</th>
							</>
						) : null}
					</tr>
				</thead>
				<tbody>
					{usuarios.map((e) =>
						e.enabled ? (
							<tr>
								<td key={e._id}>{e.email}</td>
								<td>{e.nombre}</td>
								<td>{e.apellido}</td>
								<td>{e.telefono}</td>
								<td>{e.cedula}</td>
								{userTabla === 'user-empleado' ? (
									<>
										<td>{e.cargo}</td>
										<td>{e.salario}</td>
										<td>{e.fecha_contrato}</td>
										<td>
											{e.vacations || 'No hay solicitud'}
										</td>
									</>
								) : null}
								<td>
									<button
										className='btn btn-primary'
										onClick={() => desabilitarUser(e._id)}>
										Borrar
									</button>
								</td>
							</tr>
						) : null
					)}
				</tbody>
			</table>
		</div>
	);
};
export default ListarUsuarios;
