import { listarUsuarios } from '../helper';

const ListarUsuarios = ({ user }) => {
	const usuarios = JSON.parse(listarUsuarios(user));

	return (
		<div className='w-55 p-3 mt-2 table-responsive'>
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
						<th scope='col'>Acciones</th>
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
							<td><button type="button" 
							    className="btn btn-primary" 
								data-bs-toggle="modal" 
								data-bs-target="#exampleModal">
								editar
								</button>
							</td>
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
              <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                 <div className="modal-dialog">
                   <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                 <div className="modal-body">
                    PRUEBA
                </div>
              <div className="modal-footer">
                 <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                 <button type="button" className="btn btn-primary">Save changes</button>
                </div>
               </div>
            </div>
         </div>

		</div>
	);
};
export default ListarUsuarios;
