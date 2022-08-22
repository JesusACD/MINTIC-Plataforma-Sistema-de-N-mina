import axios from 'axios';
import React, { Fragment, useContext, useState } from 'react';
import { DatosDeUsuario } from '../context/UserContext';
import {
	crearFechaVacaciones,
	getUserLocalStorage,
	guardarUserLocalStorage,
} from '../helper';

const Login = ({ user }) => {
	// Estado para los campos del formulario
	const [usuario, setUsuario] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState(false);

	// Manejar los campos del formulario
	const actualizarUsuario = (e) => {
		const value = e.target.value;
		setUsuario({ ...usuario, [e.target.name]: value });
	};

	// funcion para validar un usuario
	const validadUser = (e) => {
		e.preventDefault();

		const logearUser = async () => {
			let ur = {};
			if (user === 'user-admin') {
				ur.url = 'https://app-nomina-project.herokuapp.com/admin/login';
				crearFechaVacaciones();
			} else if (user === 'user-empleado') {
				ur.url =
					'https://app-nomina-project.herokuapp.com/employee/login';
			} else {
				ur.url = 'https://app-nomina-project.herokuapp.com/user/login';
			}
			const url = ur.url;

			try {
	
				const result = await axios.post(ur.url, usuario);
				console.log(result);
				if (result.data.auth) {
					guardarUserLocalStorage(user, result.data);
					localStorage.setItem('login', true);
					window.location.href = `datos-${user}`;
				} else {
					setError(true);
					return null;
				}
			} catch (err) {
				setError(true);
				console.log(err);
			}
		};
		logearUser();
	};
	return (
		<Fragment>
			<div className='contenido-centro'>
				<div className='wrapper shadow-lg'>
					{/* <div className='d-grid gap-2 d-md-block'> */}
					<div className='d-flex justify-content-around'>
						<button
							type='button'
							className='btn btn-outline-primary custom'
							onClick={() =>
								(window.location.href = '/empleado-login')
							}>
							Empleado
						</button>
						<button
							type='button'
							className='btn btn-outline-secondary custom'
							onClick={() =>
								(window.location.href = '/nomina-login')
							}>Nómina
						</button>
						<button
							type='button'
							className='btn btn-outline-success custom'
							onClick={() =>
								(window.location.href = '/admin-login')
							}>
							Admin
						</button>
					</div>

					<div className='imgcontainer'>
						<img
							src='../img/avatar.svg'
							alt='Avatar'
							className='avatar'
						/>
					</div>
					{error ? (
						<div className='alert alert-danger text-center fw-bold'>
							Usuario o contraseña invalidos
						</div>
					) : null}
					<h3 className='text-center'>
						Login {user.charAt(5).toUpperCase() + user.slice(6)}
					</h3>
					<form onSubmit={validadUser}>
					<div className='form-group form-floating mb-3'>
					
					<input
						type='email'
						className='form-control '
						id='Email'
						aria-describedby='emailHelp'
						placeholder='Email'
						name='email'
						onChange={actualizarUsuario}
						
					/>
						<label htmlFor='Email'>Email</label>

				</div>
				<div className='form-group form-floating mb-3'>
							
							<input
								type='password'
								className='form-control'
								id='password'
								placeholder='Password'
								name='password'
								onChange={actualizarUsuario}
							/>
							<label htmlFor='Password'>Password</label>
						</div>
					
				
						<div className='login'>
							<button type='submit' className='btn btn-success'>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default Login;
