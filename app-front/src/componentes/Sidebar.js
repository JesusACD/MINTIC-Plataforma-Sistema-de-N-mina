import React from 'react';
import { Link } from 'react-router-dom';
import { getUserLocalStorage } from '../helper';

const Sidebar = () => {
	const myuser = getUserLocalStorage();
	return (
		<div className='border-end bg-white' id='sidebar-wrapper'>
			<div className='sidebar-heading border-bottom bg-light'>
				Hola {myuser.user}
			</div>
			<div className='list-group list-group-flush'>
				<Link
					className='list-group-item list-group-item-action list-group-item-light p-3'
					to='/home'>
					Home2
				</Link>
				<Link
					className='list-group-item list-group-item-action list-group-item-light p-3'
					to='/gestion-usuario'>
					Gestion Usuario
				</Link>
				<Link
					className='list-group-item list-group-item-action list-group-item-light p-3'
					to='/usuario-nomina'>
					Usuario Nomina
				</Link>
				<Link
					className='list-group-item list-group-item-action list-group-item-light p-3'
					to='/usuario-empleado'>
					Usuario Empleado
				</Link>
				<Link
					className='list-group-item list-group-item-action list-group-item-light p-3'
					to='/gestion-nomina'>
					Gestion Nomina
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
