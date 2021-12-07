import React, { useContext, useState } from 'react';
import { DatosDeUsuario } from '../../context/UserContext';

const EditarDatos = ({ setEditarDatos }) => {
	// const [usuario, setUsuario] = useState(
	// 	JSON.parse(localStorage.getItem('user'))
	// );
	const { user, setUser } = useContext(DatosDeUsuario);
	const [usuario, setUsuario] = useState(user);

	const { nombre, apellido, cedula, telefono } = usuario;

	const handlerUser = (e) => {
		setUsuario({ ...usuario, [e.target.name]: e.target.value });
	};

	const actualizarUsuario = (e) => {
		e.preventDefault();
		setUser(usuario);
		localStorage.setItem('user', JSON.stringify(usuario));
		setEditarDatos(false);
	};

	return (
		<div className='container-fluid'>
			<div className='card w-50 p-3 mt-2'>
				<form onSubmit={actualizarUsuario}>
					<div className='mb-3'>
						<label htmlFor='nombre' className='form-label'>
							Nombres
						</label>
						<input
							type='text'
							className='form-control'
							id='nombre'
							name='nombre'
							aria-describedby='emailHelp'
							value={nombre}
							onChange={handlerUser}
						/>
					</div>
					<div className='mb-3'>
						<label htmlFor='apellido' className='form-label'>
							Apellidos
						</label>
						<input
							type='text'
							className='form-control'
							id='apellido'
							aria-describedby='emailHelp'
							value={apellido}
							name='apellido'
							onChange={handlerUser}
						/>
					</div>
					<div className='mb-3'>
						<label htmlFor='telefono' className='form-label'>
							Teléfono
						</label>
						<input
							type='number'
							className='form-control'
							id='telefono'
							aria-describedby='emailHelp'
							value={telefono}
							name='telefono'
							onChange={handlerUser}
						/>
					</div>
					<div className='mb-3'>
						<label htmlFor='cedula' className='form-label'>
							Número de Cédula
						</label>
						<input
							type='number'
							className='form-control'
							id='cedula'
							value={cedula}
							name='cedula'
							onChange={handlerUser}
						/>
					</div>
					<button type='submit' className='btn btn-primary'>
						Guardar
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditarDatos;
