import React from 'react';

const UserDatos = ({ setEditarDatos, editardatros }) => {
	const editarDatosUser = () => {
		setEditarDatos(true);
	};
	return (
		<div className='container-fluid'>
			<div className='card'>
				<div className='card-header'>Mis Datos</div>
				<div className='card-body'>
					<h5 className='card-title'>Nombre</h5>
					<p className='card-text'>Jesus Alberto</p>
					<h5 className='card-title'>Apellidos</h5>
					<p className='card-text'>Carranza de la Cruz</p>
					<h5 className='card-title'>Teléfono</h5>
					<p className='card-text'>3056784433</p>
					<h5 className='card-title'>Número de Cédula</h5>
					<p className='card-text'>10654326785</p>
					<button
						type='button'
						className='btn btn-primary'
						onClick={editarDatosUser}>
						Editar
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserDatos;