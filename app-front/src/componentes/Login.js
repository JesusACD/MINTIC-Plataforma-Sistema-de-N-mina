import React, { Fragment, useState } from 'react';
import { getUserLocalStorage, guardarUserLocalStorage } from '../helper';

const Login = ({ user }) => {
	// setUsuariologin(false);

	// Estado para los campos del formulario

	const [usuario, setUsuario] = useState({
		username: '',
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
		if (usuario.username === `${user}@mail.com`) {
			guardarUserLocalStorage(user);
			localStorage.setItem('login', true);
			window.location.href = '/home';
		} else {
			setError(true);
			return;
		}
	};
	return (
		<Fragment>
			<div className='contenido-centro'>
				<div className='wrapper'>
					{/* <div className='d-grid gap-2 d-md-block'> */}
					<div className='d-flex justify-content-around'>
						<button
							type='button'
							className='btn btn-outline-primary'
							onClick={() =>
								(window.location.href = '/empleado-login')
							}>
							Empleado
						</button>
						<button
							type='button'
							className='btn btn-outline-secondary'
							onClick={() =>
								(window.location.href = '/nomina-login')
							}>
							Nomina
						</button>
						<button
							type='button'
							className='btn btn-outline-success'
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
						<div className='alert alert-danger'>
							Usuario o contraseña invalidos
						</div>
					) : null}
					<h3 className='text-center'>
						Login {user.charAt(5).toUpperCase() + user.slice(6)}
					</h3>
					<form onSubmit={validadUser}>
						<div className='form-group'>
							<label htmlFor='exampleInputEmail1'>Email</label>
							<input
								type='email'
								className='form-control'
								id='exampleInputEmail1'
								aria-describedby='emailHelp'
								placeholder='Enter email'
								name='username'
								onChange={actualizarUsuario}
							/>
							{/* <small
								id='emailHelp'
								className='form-text text-muted'>
								We'll never share your email with anyone else.
							</small> */}
						</div>
						<div className='form-group'>
							<label htmlFor='exampleInputPassword1'>
								Password
							</label>
							<input
								type='password'
								className='form-control'
								id='exampleInputPassword1'
								placeholder='Password'
								name='password'
								onChange={actualizarUsuario}
							/>
						</div>
						<div className='form-check'>
							{/* <input
								type='checkbox'
								className='form-check-input'
								id='exampleCheck1'
							/>
							<label
								className='form-check-label'
								for='exampleCheck1'>
								Check me out
							</label> */}
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
