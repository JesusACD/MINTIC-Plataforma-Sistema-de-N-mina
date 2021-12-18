import { useContext } from 'react';
import { DatosDeUsuario } from '../context/UserContext';

const ListarUsuarios = ({ user }) => {
	const { result, resultempleado } = useContext(DatosDeUsuario);
	let res = {};

	if (user === 'user-nomina') {
		res.usuarios = result;
	} else {
		res.usuarios = resultempleado;
	}
	const usuarios = res.usuarios;
	console.log('mis usuarios', usuarios); 

	return (
		<div className='w-50 p-3 mt-2'>
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
					</tr>
				</thead>
				<tbody>
					{usuarios.map((e) => (
						<tr>
							{/* <th scope='row'>{e.id}</th> */}
							<td>{e.email}</td>
							{/* <td>{e.user}</td> */}
							<td>{e.nombre}</td>
							<td>{e.apellido}</td>
							<td>{e.telefono}</td>
							<td>{e.cedula}</td>
						</tr>
					))}
					{/* <tr>
						<th scope='row'>1</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<th scope='row'>2</th>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
					</tr>
					<tr>
						<th scope='row'>3</th>
						<td colSpan={2}>Larry the Bird</td>
						<td>@twitter</td>
					</tr> */}
				</tbody>
			</table>
		</div>
	);
};
export default ListarUsuarios;
