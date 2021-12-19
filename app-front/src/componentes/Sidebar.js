import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DatosDeUsuario } from '../context/UserContext';
import { getUserLocalStorage, listarSidebar } from '../helper';

const Sidebar = () => {
	const { user, myuser } = useContext(DatosDeUsuario);
	// const myuser = getUserLocalStorage();
	const myyuser = user.user;
	const enlaces = listarSidebar(user.user);

	const { nombre, apellido } = myuser;
	return (
		<div className='border-end bg-carulla-light' id='sidebar-wrapper'>
			<div className='sidebar-heading border-bottom bg-carulla'>
				Hola <span className='fw-bold'>{`${nombre} ${apellido}`}</span>
				<p className='fs-6'>
					{myyuser.charAt(5).toUpperCase() + myyuser.slice(6)}
				</p>
			</div>
			<div className='list-group list-group-flush'>
				{enlaces.map((link) => (
					<Link
						className='list-group-item list-group-item-action list-group-item-light p-3'
						to={link.ruta}>
						{link.nombre}
					</Link>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
