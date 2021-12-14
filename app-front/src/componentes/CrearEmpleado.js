import { useContext, useState } from 'react';
import Exito from './Exito';
import { DatosDeUsuario } from '../context/UserContext';

const CrearEmpleado = () => {
	const [users, setUsers] = useState({
		nombre: '',
		apellido: '',
		email: '',
		telefono: '',
		cedula: '',
		cargo: '',
		salario: '',
		fechaingreso: ''
	});
	const {nombre, apellido, email, telefono, cedula,cargo,salario,fechaingreso } = users;
	const { listauser, setListaUser } = useContext(DatosDeUsuario);
	const [exito, setExito] = useState(false);

	const handlerUser = (e) => {
		setUsers({
			...users,
			[e.target.name]: e.target.value,
		});
	};

	const handlerSudmit = (e) => {
		e.preventDefault();
		setListaUser([...listauser, users]);
		if (
			nombre.trim() === '' ||
			apellido.trim() === '' ||
			email.trim() === '' ||
			telefono.trim() === '' ||
			cedula.trim() === '' ||
			cargo.trim() === '' ||
			salario.trim() === '' ||
			fechaingreso.trim() === '' 
		) {
			return null;
		}
		setExito(true);
		setUsers({
			nombre: '',
			apellido: '',
			email: '',
			telefono: '',
			cedula: '',
			cargo: '',
			salario: '',
			fechaingreso: ''
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
	                           <select name='cargo'
							    className="form-select form-select-lg mb-3" 
								aria-label="form-select-lg example">
                               <option selected>Selecciona un cargo</option>
                               <option>Cargo One</option>
                               <option >Cargo Two</option>
                               <option >Cargo Three</option>
							    onChange={handlerUser}
                              </select>
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
								  name='fechaingreso'
								  onChange={handlerUser}
								  value={fechaingreso}
							  />
							  <label htmlFor='Fecha de ingreso'>Fecha de ingreso</label>
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
