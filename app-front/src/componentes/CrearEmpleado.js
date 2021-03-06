import { useContext, useState } from 'react';
import Exito from './Exito';
import { DatosDeUsuario } from '../context/UserContext';
import axios from 'axios';

const CrearEmpleado = () => {
	const [users, setUsers] = useState({
		email: '',
		nombre: '',
		apellido: '',
		telefono: '',
		cedula: '',
		cargo: '',
		salario: '',
		fecha_contrato: '',
	});
	const {
		email,
		nombre,
		apellido,
		telefono,
		cedula,
		cargo,
		salario,
		fecha_contrato,
	} = users;
	const { actrualizarListaEmpleado } = useContext(DatosDeUsuario);
	const [exito, setExito] = useState(false);

	const handlerUser = (e) => {
		setUsers({
			...users,
			[e.target.name]: e.target.value,
		});
	};

	const CrearUserEmpleadoAPI = async () => {
		const url =
			'https://app-nomina-project.herokuapp.com/user/register-employee';
		let userData = JSON.parse(localStorage.getItem('user'));

		const listUser = await axios.post(url, users, {
			headers: { 'access-token': userData.data.token },
		});
		console.log(userData);
		console.log(listUser.data);
		actrualizarListaEmpleado(true);
	};

	const CrearEmpleado = () => {
		localStorage.setItem('emplados', JSON.stringify(users));
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
		CrearUserEmpleadoAPI();
		setUsers({
			email: '',
			nombre: '',
			apellido: '',
			telefono: '',
			cedula: '',
			cargo: '',
			salario: '',
			fecha_contrato: '',
		});
	};
	return (
		<>
			<div className='row justify-content-center'>
				<div className='col-lg-6'>
					<div className='card shadow-lg border-0 rounded-lg mt-5'>
						<div className='card-header'>
							<h3 className='text-center font-weight-light my-4'>
								Crear Empleado
							</h3>
						</div>
						<div className='card-body'>
						<form onSubmit={handlerSudmit}>
							<div className='row mb-3'> 
							<h5>Información básica</h5>
							<hr></hr>
							  <div className='col'>
								 <div className='form-floating mb-2 form-outline'>
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
							  </div>
							  <div className='col'>
								 <div className='form-floating mb-3 form-outline'>
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
							 </div>
                            </div>
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
									<label htmlFor='email'>Email</label>
								</div>

								<div className='row mb-3'> 
						
							  <div className='col'>
								 <div className='form-floating mb-3 form-outline'>
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
							  </div>
							  <div className='col'>
								 <div className='form-floating mb-3 form-outline'>
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
							 </div>
                            </div>
                          
								<h5>Información laboral</h5>
								<hr></hr>
								<div className='row mb-3'> 
						
						<div className='col'>
						   <div className='form-floating mb-3 form-outline'>
						   <input
								  className='form-control'
								  id='cargo'
								  type='text'
								  placeholder='Cargo'
								  name='cargo'
								  onChange={handlerUser}
								  value={cargo}
							  />
	                        
							  <label htmlFor='Cargo'>Cargo</label>
							 
						   </div>
						</div>
						<div className='col'>
						   <div className='form-floating mb-3 form-outline'>
							  <input
								  className='form-control'
								  id='salario'
								  type='number'
								  placeholder='Salario'
								  name='salario'
								  onChange={handlerUser}
								  value={salario}
							  />
							  <label htmlFor='Salario'>Salario</label>
						   </div>
					   </div>
					  </div>
					  <div className='form-floating mb-3 form-outline'>
							  <input
								  className='form-control'
								  id='fechaingreso'
								  type='date'
								  placeholder='Fecha de ingreso'
								  name='fecha_contrato'
								  onChange={handlerUser}
								  value={fecha_contrato}
							  />
							  <label htmlFor='Fecha de Contrato'>Fecha de contrato</label>
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

export default CrearEmpleado;
