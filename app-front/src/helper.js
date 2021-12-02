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
export function guardarUserLocalStorage(user) {
	let myuser;
	switch (user) {
		case 'user-empleado':
			myuser = { email: 'user-empleado@mail.com', user: 'user-empleado' };
			break;
		case 'user-nomina':
			myuser = { email: 'user-nomina@mail.com', user: 'user-nomina' };
			break;
		case 'user-admin':
			myuser = { email: 'user-admin@mail.com', user: 'user-admin' };
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
