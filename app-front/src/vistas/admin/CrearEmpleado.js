import { useContext, useState } from 'react';
import Exito from '../../componentes/Exito';
import { DatosDeUsuario } from '../../context/UserContext';

const CrearEmpleado = () => {
	const [users, setUsers] = useState({
		email: '',
		nombre: '',
		apellido: '',
		telefono: '',
		cedula: '',
	});
	const { email, nombre, apellido, telefono, cedula } = users;
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
			email.trim() === '' ||
			nombre.trim() === '' ||
			apellido.trim() === '' ||
			telefono.trim() === '' ||
			cedula.trim() === ''
		) {
			return null;
		}
		setExito(true);
		setUsers({
			email: '',
			nombre: '',
			apellido: '',
			telefono: '',
			cedula: '',
		});
	};
	return (
		<div className='container-fluid'>
			<div className='card w-50 p-3 mt-2'>
				<h3>Crear Empleado</h3>
				<form onSubmit={handlerSudmit}>
					{exito ? (
						<Exito mensaje='Usuario Creado con exito' />
					) : null}
					<div className='mb-3'>
						<label htmlFor='email' className='form-label'>
							Email
						</label>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							aria-describedby='emailHelp'
							onChange={handlerUser}
							value={email}
						/>
					</div>
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
							onChange={handlerUser}
							value={nombre}
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
							name='apellido'
							onChange={handlerUser}
							value={apellido}
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
							name='telefono'
							onChange={handlerUser}
							value={telefono}
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
							name='cedula'
							onChange={handlerUser}
							value={cedula}
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

export default CrearEmpleado;
