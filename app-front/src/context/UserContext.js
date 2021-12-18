import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { listarUsuarios } from '../helper';

export const DatosDeUsuario = createContext();

const UserContextProvider = (props) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	const [result, guardarResult] = useState([]);

	useEffect(() => {
		const ListarUsersAPI = async () => {
			const url =
				'https://app-nomina-project.herokuapp.com/admin/get-users';
			let userData = JSON.parse(localStorage.getItem('user'));

			const listUser = await axios.get(url, {
				params: '',
				headers: { 'access-token': userData.data.token },
			});
			console.log(listUser.data);
			guardarResult(listUser.data);
		};
		ListarUsersAPI();
	}, []);

	return (
		<DatosDeUsuario.Provider
			value={{
				user,
				setUser,
				result,
			}}>
			{props.children}
		</DatosDeUsuario.Provider>
	);
};

export default UserContextProvider;
