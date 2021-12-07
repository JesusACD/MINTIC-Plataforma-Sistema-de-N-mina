import { useContext } from 'react';
import { DatosDeUsuario } from '../../context/UserContext';
import { listarUsuarios } from '../../helper';

const ListarEmpleados = () => {
	// const usuarios = JSON.parse(listarUsuarios('user-empleado'));
	const { listauser, setListaUser } = useContext(DatosDeUsuario);

	return (
		<div className='w-50 p-3 mt-2'>
			<h3>Lista de Empleados</h3>
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
					{listauser.map((e) => (
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
				</tbody>
			</table>
		</div>
	);
};
export default ListarEmpleados;
