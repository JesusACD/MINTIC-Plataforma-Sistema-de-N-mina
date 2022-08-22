import axios from 'axios';
import React, { useState, useContext } from 'react';
import Exito from '../../componentes/Exito';
import { DatosDeUsuario } from '../../context/UserContext';

const Vacaciones = ({ type }) => {
	const { user, setUser } = useContext(DatosDeUsuario);
	const [valuedate, setValueDate] = useState({
		i: '',
		ii: '',
	});
	const [exito, setExito] = useState(false);
	const { i, ii } = valuedate;

	const handleFecha = (e) => {
		// setFecha(e.target.value);
		setValueDate({ ...valuedate, [e.target.name]: e.target.value });
	};

	const guardarFecha = (e) => {
		e.preventDefault();
		let f = valuedate.i.split('-').reverse();
		const myfecha = `${f[0]}/${f[1]}/${f[2]}`;

		const f2 = valuedate.ii.split('-').reverse();
		const myfecha2 = `${f2[0]}/${f2[1]}/${f2[2]}`;

		const token = JSON.parse(localStorage.getItem('user')).data.token;
		const parametro = type === 'vacaciones' ? 'vacation' : 'permission';
		const url = `https://app-nomina-project.herokuapp.com/employee/${parametro}`;
		axios
			.post(
				url,
				{
					fecha_inicio: myfecha,
					fecha_fin: myfecha2,
				},
				{
					headers: {
						'access-token': token,
					},
				}
			)
			.then((e) => {
				console.log('se envio exitosamente');
				setExito(true);
			});

		setValueDate({
			i: '',
			ii: '',
		});
	};
	return (
		<div className='container-fluid'>
			<div className='mb-3 w-50 mt-2'>
				<h3>
					Solicitar {type === 'vacaciones' ? 'Vacaciones' : 'Permiso'}
				</h3>
			</div>
			<form onSubmit={guardarFecha}>
				<div className='input-group mb-3 w-50 mt-2'>
					<input
						type='date'
						className='form-control'
						placeholder="Recipient's username"
						aria-label="Recipient's username"
						aria-describedby='button-addon2'
						name='i'
						onChange={handleFecha}
						value={i}
					/>
					<input
						type='date'
						className='form-control'
						placeholder="Recipient's username"
						aria-label="Recipient's username"
						aria-describedby='button-addon2'
						name='ii'
						onChange={handleFecha}
						value={ii}
					/>
					<button
						className='btn btn-outline-secondary'
						type='submit'
						id='button-addon2'>
						Solicitar
					</button>
				</div>
				{exito ? (
					<Exito mensaje='Solicitud enviada exitosamente!'></Exito>
				) : null}
			</form>
		</div>
	);
};

export default Vacaciones;
