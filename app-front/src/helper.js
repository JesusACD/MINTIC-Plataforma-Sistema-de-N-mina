export function obtenerUsuarios(user) {
	let myuser;
	switch (user) {
		case 'user-empleado':
			myuser = 'user-empleado@mail.com';
			break;
		case 'user-nomina':
			myuser = 'user-nomina@mail.com';
			break;
		case 'user-admin':
			myuser = 'user-admin@mail.com';
			break;
		default:
			break;
	}
	return myuser;
}
export function guardarUserLocalStorage(user, data) {
	let myuser;
	switch (user) {
		case 'user-empleado':
			myuser = {
				user: 'user-empleado',
				data,
			};

			break;
		case 'user-nomina':
			myuser = {
				email: 'user-nomina@mail.com',
				user: 'user-nomina',
				nombre: 'Manolo',
				apellido: 'Ozuna',
				telefono: 3066785432,
				cedula: 10653245588,
				data,
			};
			// const logearUser = async () => {
			// 	const url = '';
			// };
			break;
		case 'user-admin':
			myuser = {
				email: 'admin@appnomina.com',
				user: 'user-admin',
				nombre: 'Giovanny',
				apellido: 'Cruz',
				telefono: 3076785432,
				cedula: 10653245599,
				data,
			};
			break;
		default:
			break;
	}
	localStorage.setItem('user', JSON.stringify(myuser));
	return JSON.stringify(myuser);
}
export function getUserLocalStorage() {
	if (JSON.parse(localStorage.getItem('user'))) {
		return JSON.parse(localStorage.getItem('user'));
	} else {
		return null;
	}
}

export function listarSidebar(user) {
	let rutas = [];
	switch (user) {
		case 'user-empleado':
			rutas = [
				{
					ruta: '/descargar-reporte-pago',
					nombre: 'Descargar Reporte de Pago',
				},
				{
					ruta: '/solicitar-certificado-laboral',
					nombre: 'Certificado Laboral',
				},
				{
					ruta: '/solicitar-vacaciones',
					nombre: 'Solicitar Vacaciones',
				},
				{
					ruta: '/solicitar-permisos',
					nombre: 'Solicitar Permisos',
				},
			];
			break;
		case 'user-nomina':
			rutas = [
				{
					ruta: '/crear-empleados',
					nombre: 'Crear Empleados',
				},
				{
					ruta: '/listar-empleados',
					nombre: 'Listar Empleados',
				},
				{
					ruta: '/listar-vacaciones-empleados',
					nombre: 'Vacaciones Empleados',
				},
				{
					ruta: '/listar-permiso-empleados',
					nombre: 'Permisos Empleados',
				},
				// {
				// 	ruta: '/reportes',
				// 	nombre: 'Reportes',
				// },
			];
			break;
		case 'user-admin':
			rutas = [
				{
					ruta: '/admin-crear-empleados',
					nombre: 'Crear Empleados',
				},
				{
					ruta: '/admin-crear-nominas',
					nombre: 'Crear Usuario Nomina',
				},
				{
					ruta: '/admin-listar-empleados',
					nombre: 'Listar Usuarios Empleados',
				},
				{
					ruta: '/admin-listar-nomina',
					nombre: 'Listar Usuarios Nomina',
				},
				{
					ruta: '/admin-permiso-empleados',
					nombre: 'Permiso Empleados',
				},
				{
					ruta: '/admin-vacaciones-empleados',
					nombre: 'Vacaciones Empleados',
				},
				// {
				// 	ruta: '/admin-reportes',
				// 	nombre: 'Reportes',
				// },
			];
			break;

		default:
			break;
	}
	return rutas;
}

export function listarUsuarios(user) {
	let myuser = [];
	switch (user) {
		case 'user-empleado':
			myuser = [
				{
					id: 1,
					email: 'user-empleado01@mail.com',
					user: 'user-empleado',
					nombre: 'Tom',
					apellido: 'Hardy',
					telefono: 3056785432,
					cedula: 10653245577,
				},
				{
					id: 2,
					email: 'user-empleado02@mail.com',
					user: 'user-empleado',
					nombre: 'Dwayne',
					apellido: 'Johnson',
					telefono: 3056780192,
					cedula: 10653248374,
				},
				{
					id: 3,
					email: 'user-empleado03@mail.com',
					user: 'user-empleado',
					nombre: 'Reynaldo',
					apellido: 'Disla',
					telefono: 3056785678,
					cedula: 10653246453,
				},
				{
					id: 4,
					email: 'user-empleado04@mail.com',
					user: 'user-empleado',
					nombre: 'Dwayne',
					apellido: 'Johnson',
					telefono: 3056786789,
					cedula: 10653240099,
				},
				{
					id: 5,
					email: 'user-empleado05@mail.com',
					user: 'user-empleado',
					nombre: 'Pancho',
					apellido: 'Clisante',
					telefono: 3056781234,
					cedula: 10653242211,
				},
			];
			break;
		case 'user-nomina':
			myuser = [
				{
					id: 1,
					email: 'user-nomina01@mail.com',
					user: 'user-nomina',
					nombre: 'John',
					apellido: 'Leguizamo',
					telefono: 3056785432,
					cedula: 10653245577,
				},
				{
					id: 2,
					email: 'user-nomina02@mail.com',
					user: 'user-nomina',
					nombre: 'María',
					apellido: 'Gabriela de Faría',
					telefono: 3056780192,
					cedula: 10653248374,
				},
				{
					id: 3,
					email: 'user-nomina03@mail.com',
					user: 'user-nomina',
					nombre: 'Karen',
					apellido: 'Martínez',
					telefono: 3056785678,
					cedula: 10653246453,
				},
				{
					id: 4,
					email: 'user-nomina04@mail.com',
					user: 'user-nomina',
					nombre: 'Marcela',
					apellido: 'Carvajal',
					telefono: 3056786789,
					cedula: 10653240099,
				},
				{
					id: 5,
					email: 'user-nomina@mail.com',
					user: 'user-nomina',
					nombre: 'Carlos',
					apellido: 'Valderrama',
					telefono: 3056781234,
					cedula: 10653242211,
				},
			];
			break;
		case 'user-admin':
			myuser = {
				email: 'user-admin@mail.com',
				user: 'user-admin',
				nombre: 'Giovanny',
				apellido: 'Cruz',
				telefono: 3076785432,
				cedula: 10653245599,
			};
			break;
		default:
			break;
	}
	console.log('lo que entra', myuser);
	localStorage.setItem('listauser', JSON.stringify(myuser));
	return JSON.stringify(myuser);
}

/********************************************/

export function crearFechaVacaciones(fecha_inicio = '', fecha_fin = '') {
	const vacaciones = {
		fecha_inicio: fecha_inicio,
		fecha_fin: fecha_fin,
	};

	localStorage.setItem('vacaciones-empleadops', JSON.stringify(vacaciones));
}
