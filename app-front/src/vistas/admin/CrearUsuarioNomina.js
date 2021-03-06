import axios from 'axios';
import { useContext, useState } from 'react';
import Exito from '../../componentes/Exito';
import { DatosDeUsuario } from '../../context/UserContext';


const CrearUsuarioNomina = () => {
	const [users, setUsers] = useState({
		email: '',
		nombre: '',
		apellido: '',
		telefono: '',
		cedula: '',
	});
	const { email, nombre, apellido, telefono, cedula } = users;
	const [exito, setExito] = useState(false);
	const {guardarResult, actrualizarLista} = useContext(DatosDeUsuario)

	const handlerUser = (e) => {
		setUsers({
			...users,
			[e.target.name]: e.target.value,
		});
	};

	const CrearUserNominaAPI = async () => {
		const url =
			'https://app-nomina-project.herokuapp.com/admin/register-user';
		let userData = JSON.parse(localStorage.getItem('user'));

		const listUser = await axios.post(url, users, {
			headers: { 'access-token': userData.data.token },
		});
		console.log(listUser.data);
		actrualizarLista(true)
	};

	const handlerSudmit = (e) => {
		e.preventDefault();
		if (
			email.trim() === '' ||
			nombre.trim() === '' ||
			apellido.trim() === '' ||
			telefono.trim() === '' ||
			cedula.trim() === ''
		) {
			return null;
		}

		setExito(true);
		CrearUserNominaAPI();
		setUsers({
			email: '',
			nombre: '',
			apellido: '',
			telefono: '',
			cedula: '',
		});
	};
	return (
		<>
			<div className='row justify-content-center'>
				<div className='col-lg-5'>
					<div className='card shadow-lg border-0 rounded-lg mt-5'>
						<div className='card-header'>
							<h3 className='text-center font-weight-light my-4'>
								Crear Usuario Nómina
							</h3>
						</div>
						<div className='card-body'>
							<form onSubmit={handlerSudmit}>
								<div className='form-floating mb-3'>
									<input
										className='form-control'
										id='email'
										type='email'
										placeholder='name@example.com'
										name='email'
										onChange={handlerUser}
										value={email}
									/>
									<label htmlFor='inputEmail'>Email</label>
								</div>
								<div className='form-floating mb-3'>
									<input
										className='form-control'
										id='nombre'
										type='text'
										placeholder='Nombres'
										name='nombre'
										onChange={handlerUser}
										value={nombre}
									/>
									<label htmlFor='Nombres'>Nombres</label>
								</div>

								<div className='form-floating mb-3'>
									<input
										className='form-control'
										id='apellido'
										type='text'
										placeholder='Apellidos'
										name='apellido'
										onChange={handlerUser}
										value={apellido}
									/>
									<label htmlFor='Apellidos'>Apellidos</label>
								</div>

								<div className='form-floating mb-3'>
									<input
										className='form-control'
										id='telefono'
										type='number'
										placeholder='Telefono'
										name='telefono'
										onChange={handlerUser}
										value={telefono}
									/>
									<label htmlFor='Telefono'>Telefono</label>
								</div>

								<div className='form-floating mb-3'>
									<input
										className='form-control'
										id='cedula'
										type='number'
										placeholder='Cedula'
										name='cedula'
										onChange={handlerUser}
										value={cedula}
									/>
									<label htmlFor='Cedula'>Cedula</label>
								</div>

								<div className='d-flex align-items-center justify-content-between mt-4 mb-0'>
									<button
										className='btn btn-success'
										type='submit'>
										Registrar
									</button>
								</div>
							</form>
						</div>
						<div className='card-footer text-center py-3'>
							{exito ? (
								<Exito mensaje='Usuario Creado con exito' />
							) : null}
						</div>
					</div>
				</div>
			</div>
			<div dangerouslySetInnerHTML={{ __html: ' &nbsp;' }} />
		</>
	);
};

export default CrearUsuarioNomina;
