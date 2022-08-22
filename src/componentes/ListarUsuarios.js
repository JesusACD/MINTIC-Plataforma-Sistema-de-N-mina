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
		<div className='w-55 p-3 mt-2 table-responsive'>
			<h2>
				Listado de Usuarios{' '}
				{userTabla === 'user-empleado' ? 'Empleados' : 'Nomina'}
			</h2>
			<table className='table table-striped table-hover table-bordered'>
				<thead >
					<tr>
						{/* <th scope='col'>#</th> */}
						<th className='text-center' scope='col'>Correo electrónico</th>
						{/* <th scope='col'>User</th> */}
						<th className='text-center' scope='col'>Nombre</th>
						<th className='text-center' scope='col'>Apellido</th>
						<th className='text-center' scope='col'>Teléfono</th>
						<th className='text-center' scope='col'>Cédula</th>
						{userTabla === 'user-empleado' ? (
							<>
								<th  className='text-center' scope='col'>Cargo</th>
								<th className='text-center' scope='col'>Salario</th>
								<th className='text-center' scope='col'>Fecha de Contratación</th>
							</>
						) : null}
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{usuarios.map((e) =>
						e.enabled ? (
							<tr>
								<td className='text-center' key={e._id}>{e.email}</td>
								<td className='text-center'>{e.nombre}</td>
								<td className='text-center'>{e.apellido}</td>
								<td className='text-center'>{e.telefono}</td>
								<td className='text-center'>{e.cedula}</td>
								{userTabla === 'user-empleado' ? (
									<>
										<td className='text-center'>{e.cargo}</td>
										<td className='text-center'>{e.salario}</td>
										<td className='text-center'>{e.fecha_contrato}</td>
									</>
								) : null}
								<td className='text-center'>
									<button
										className='btn btn-primary '
										onClick={() => desabilitarUser(e._id)}>
										<i className="far fa-trash-alt" />

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
