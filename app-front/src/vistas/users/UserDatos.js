import React from 'react';

const UserDatos = ({ setEditarDatos, editardatros }) => {
	const editarDatosUser = () => {
		setEditarDatos(true);
	};
	const { nombre, apellido, cedula, telefono } = JSON.parse(
		localStorage.getItem('user')
	);
	return (
		<div className='container-fluid'>
			<div className='card'>
				<div className='card-header'>Mis Datos</div>
				<div className='card-body'>
					<h5 className='card-title'>Nombre</h5>
					<p className='card-text'>{nombre}</p>
					<h5 className='card-title'>Apellidos</h5>
					<p className='card-text'>{apellido}</p>
					<h5 className='card-title'>Teléfono</h5>
					<p className='card-text'>{telefono}</p>
					<h5 className='card-title'>Número de Cédula</h5>
					<p className='card-text'>{cedula}</p>
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
