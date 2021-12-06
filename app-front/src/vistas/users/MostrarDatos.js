import React, { Fragment, useState } from 'react';
import EditarDatos from './EditarDatos';
import UserDatos from './UserDatos';

const MostrarDatos = () => {
	const [editardatros, setEditarDatos] = useState(false);
	let Loquesemuestra = {};
	editardatros
		? (Loquesemuestra.component = (
				<EditarDatos setEditarDatos={setEditarDatos} />
		  ))
		: (Loquesemuestra.component = (
				<UserDatos
					setEditarDatos={setEditarDatos}
					editardatros={editardatros}
				/>
		  ));

	return <Fragment>{Loquesemuestra.component}</Fragment>;
};
export default MostrarDatos;
