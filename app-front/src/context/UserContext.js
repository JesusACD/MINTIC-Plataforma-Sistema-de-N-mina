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

	let usuario = user ? user.data.user : '';
	const [myuser, setMyUser] = useState(usuario);

	// listar usaurios nomina
	useEffect(() => {
		actrualizarLista(false);
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
		actrualizarListaEmpleado(false);
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
				myuser,
				setMyUser,
			}}>
			{props.children}
		</DatosDeUsuario.Provider>
	);
};

export default UserContextProvider;
