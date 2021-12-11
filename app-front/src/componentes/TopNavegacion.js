import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DatosDeUsuario } from '../context/UserContext';

const TopNavegacion = () => {
	const { user } = useContext(DatosDeUsuario);
	const cerrarSesion = () => {
		localStorage.removeItem(user.user);
		localStorage.removeItem('admin');
		localStorage.removeItem('login');
		localStorage.removeItem('user');
		localStorage.removeItem('listauser');
		window.location.href = '/';
	};
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-carulla border-bottom'>
			<div className='container-fluid'>
				<button
					className='btn btn-success bg-carulla'
					id='sidebarToggle'>
					<i className='fas fa-bars' />
				</button>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div
					className='collapse navbar-collapse'
					id='navbarSupportedContent'>
					<ul className='navbar-nav ms-auto mt-2 mt-lg-0'>
						<li className='nav-item dropdown'>
							<a
								className='nav-link dropdown-toggle'
								id='navbarDropdown'
								href='#'
								role='button'
								data-bs-toggle='dropdown'
								aria-haspopup='true'
								aria-expanded='false'>
								{`${user.nombre} ${user.apellido}`}
							</a>
							<div
								className='dropdown-menu dropdown-menu-end'
								aria-labelledby='navbarDropdown'>
								{/* <a className='dropdown-item' href='#!'>
									Mis datos
								</a> */}
								<Link
									className='dropdown-item'
									to={`datos-${user.user}`}>
									Mis datos
								</Link>

								<div className='dropdown-divider'></div>
								<a
									className='dropdown-item'
									onClick={cerrarSesion}>
									Salir
								</a>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default TopNavegacion;
