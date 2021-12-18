import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { listarUsuarios } from '../helper';

export const DatosDeUsuario = createContext();

const UserContextProvider = (props) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
	const [result, guardarResult] = useState([]);
	const [lista, actrualizarLista] = useState(false);
	const [resultempleado, guardarResultEmpleado] = useState([]);
	const [listaempleado, actrualizarListaEmpleado] = useState(false);

	// listar usaurios nomina
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

		if (user) ListarUsersAPI();
	}, [lista]);

	// listar usuarios empleados
	useEffect(() => {
		const ListarUsersEmpleadoAPI = async () => {
			const url =
				'https://app-nomina-project.herokuapp.com/user/get-employees';
			let userData = JSON.parse(localStorage.getItem('user'));

			const listUser = await axios.get(url, {
				params: '',
				headers: { 'access-token': userData.data.token },
			});
			console.log(listUser.data);
			guardarResultEmpleado(listUser.data);
		};
		if (user) ListarUsersEmpleadoAPI();
	}, [listaempleado]);

	return (
		<DatosDeUsuario.Provider
			value={{
				user,
				setUser,
				result,
				guardarResult,
				actrualizarLista,
				actrualizarListaEmpleado,
				resultempleado,
			}}>
			{props.children}
		</DatosDeUsuario.Provider>
	);
};

export default UserContextProvider;
