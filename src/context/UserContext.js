import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const DatosDeUsuario = createContext();

const UserContextProvider = (props) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

	const [result, guardarResult] = useState([]);
	const [lista, actrualizarLista] = useState(false);
	const [resultempleado, guardarResultEmpleado] = useState([]);
	const [listaempleado, actrualizarListaEmpleado] = useState(false);
	const [listvacaciones, setListVacaciones] = useState([]);
	const [activarVacaciones, setActivarVacaciones] = useState(false);
	const [listpermisos, setListPermisos] = useState([]);
	const [activarpermisos, setActivarPermisos] = useState(false);

	let usuario = user ? user.data.user : '';
	const [myuser, setMyUser] = useState(usuario);

	// listar usuarios permiso
	useEffect(() => {
		setActivarPermisos(false);
		const listarPermisos = async () => {
			const url =
				'https://app-nomina-project.herokuapp.com/user/get-permissions';
			let token = user.data.token;
			const result = await axios.get(url, {
				headers: { 'access-token': token },
			});
			console.log(result.data);
			setListPermisos(result.data);
		};
		if (user) listarPermisos();
	}, [activarpermisos]);

	// listar usuarios vacaciones
	useEffect(() => {
		setActivarVacaciones(false);
		const listarVacaciones = async () => {
			const url =
				'https://app-nomina-project.herokuapp.com/user/get-vacations';
			let token = user.data.token;
			const result = await axios.get(url, {
				headers: { 'access-token': token },
			});
			console.log(result.data);
			setListVacaciones(result.data);
		};
		if (user) listarVacaciones();
	}, [activarVacaciones]);

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
				listvacaciones,
				setActivarVacaciones,
				listpermisos,
				setActivarPermisos,
			}}>
			{props.children}
		</DatosDeUsuario.Provider>
	);
};

export default UserContextProvider;
