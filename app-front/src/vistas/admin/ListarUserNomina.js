import { useContext } from 'react';
import { DatosDeUsuario } from '../../context/UserContext';
import { listarUsuarios } from '../../helper';

const ListarUserNomina = () => {
	const usuarios = JSON.parse(listarUsuarios('user-nomina'));
	const { listauser, setListaUser } = useContext(DatosDeUsuario);

	return (
		<div className='w-50 p-3 mt-2'>
			<h3>Lista de Usuarios Nomina</h3>
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
							<td>{e.emailUserNomina}</td>
							{/* <td>{e.user}</td> */}
							<td>{e.nombreUserNomina}</td>
							<td>{e.apellidoUserNomina}</td>
							<td>{e.telefonoUserNomina}</td>
							<td>{e.cedulaUserNomina}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
export default ListarUserNomina;
