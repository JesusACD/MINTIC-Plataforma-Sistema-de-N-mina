import React, { createContext, useState } from 'react';

export const DatosDeUsuario = createContext();

const UserContextProvider = (props) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	return (
		<DatosDeUsuario.Provider
			value={{
				user,
				setUser,
			}}>
			{props.children}
		</DatosDeUsuario.Provider>
	);
};

export default UserContextProvider;
