import React, { useState, useContext } from 'react';
import { DatosDeUsuario } from '../../context/UserContext';

const Vacaciones = () => {
	const [fecha, setFecha] = useState();
	const { user, setUser } = useContext(DatosDeUsuario);

	const handleFecha = (e) => {
		setFecha(e.target.value);
	};

	const guardarFecha = (e) => {
		e.preventDefault();
		const fechaInt = parseInt(fecha.replaceAll('-', ''));
		setUser({ ...user, fechavacaciones: fechaInt });
	};
	return (
		<div className='container-fluid'>
			<div className='mb-3 w-50 mt-2'>
				<h3>Solicitar Vacaciones</h3>
			</div>
			<form onSubmit={guardarFecha}>
				<div className='input-group mb-3 w-50 mt-2'>
					<input
						type='date'
						className='form-control'
						placeholder="Recipient's username"
						aria-label="Recipient's username"
						aria-describedby='button-addon2'
						onChange={handleFecha}
					/>
					<input
						type='date'
						className='form-control'
						placeholder="Recipient's username"
						aria-label="Recipient's username"
						aria-describedby='button-addon2'
						onChange={handleFecha}
					/>
					<button
						className='btn btn-outline-secondary'
						type='submit'
						id='button-addon2'>
						Solicitar
					</button>
				</div>
			</form>
		</div>
	);
};

export default Vacaciones;
