import React, { createContext, useState } from 'react';
import { listarUsuarios } from '../helper';

export const DatosDeUsuario = createContext();

const UserContextProvider = (props) => {
	listarUsuarios('user-empleado');
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	const [listauser, setListaUser] = useState(
		JSON.parse(localStorage.getItem('listauser'))
	);
	return (
		<DatosDeUsuario.Provider
			value={{
				user,
				setUser,
				listauser,
				setListaUser,
			}}>
			{props.children}
		</DatosDeUsuario.Provider>
	);
};

export default UserContextProvider;
