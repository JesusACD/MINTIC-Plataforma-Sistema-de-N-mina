import React, { Fragment, useState } from 'react';

const Login = ({ setUsuariologin }) => {
	// setUsuariologin(false);

	// Estado para los campos del formulario
	const [usuario, setUsuario] = useState({
		username: '',
		password: '',
	});

	// Manejar los campos del formulario
	const actualizarUsuario = (e) => {
		const value = e.target.value;
		setUsuario({ ...usuario, [e.target.name]: value });
	};

	// funcion para validar un usuario
	const validadUser = (e) => {
		e.preventDefault();
		console.log(usuario);
		if (usuario.username == 'user@mail.com') {
			setUsuariologin(false);
		}
	};
	return (
		<Fragment>
			<div className='contenido-centro'>
				<form onSubmit={validadUser}>
					<div className='form-group'>
						<label for='exampleInputEmail1'>Email address</label>
						<input
							type='email'
							className='form-control'
							id='exampleInputEmail1'
							aria-describedby='emailHelp'
							placeholder='Enter email'
							name='username'
							onChange={actualizarUsuario}
						/>
						<small id='emailHelp' className='form-text text-muted'>
							We'll never share your email with anyone else.
						</small>
					</div>
					<div className='form-group'>
						<label for='exampleInputPassword1'>Password</label>
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
						<input
							type='checkbox'
							className='form-check-input'
							id='exampleCheck1'
						/>
						<label className='form-check-label' for='exampleCheck1'>
							Check me out
						</label>
					</div>
					<button type='submit' className='btn btn-primary'>
						Submit
					</button>
				</form>
			</div>
		</Fragment>
	);
};

export default Login;
