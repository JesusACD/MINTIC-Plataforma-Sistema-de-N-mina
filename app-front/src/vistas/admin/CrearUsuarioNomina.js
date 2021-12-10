import { useContext, useState } from 'react';
import Exito from '../../componentes/Exito';
import { DatosDeUsuario } from '../../context/UserContext';

const CrearUsuarioNomina= () => {
	const [users, setUsers] = useState({
		emailUserNomina: '',
		nombreUserNomina: '',
		apellidoUserNomina: '',
		telefonoUserNomina: '',
		cedulaUserNomina: '',
	});
	const { emailUserNomina, nombreUserNomina, apellidoUserNomina, telefonoUserNomina, cedulaUserNomina } = users;
	const { listauser, setListaUser } = useContext(DatosDeUsuario);
	const [exito, setExito] = useState(false);

	const handlerUser = (e) => {
		setUsers({
			...users,
			[e.target.name]: e.target.value,
		});
	};

	const handlerSudmit = (e) => {
		e.preventDefault();
		setListaUser([...listauser, users]);
		if (
			emailUserNomina.trim() === '' ||
			nombreUserNomina.trim() === '' ||
			apellidoUserNomina.trim() === '' ||
			telefonoUserNomina.trim() === '' ||
			cedulaUserNomina.trim() === ''
		) {
			return null;
		}
		setExito(true);
		setUsers({
			emailUserNomina: '',
			nombreUserNomina: '',
			apellidoUserNomina: '',
			telefonoUserNomina: '',
			cedulaUserNomina: '',
		});
	};
	return (
		<><div className="row justify-content-center">
			<div className="col-lg-5">
				<div className="card shadow-lg border-0 rounded-lg mt-5">
					<div className="card-header"><h3 className="text-center font-weight-light my-4">Crear Usuario Nómina</h3></div>
					<div className="card-body">
						<form onSubmit={handlerSudmit}>
							<div className="form-floating mb-3">
								<input className="form-control" id="email" type="email" placeholder="name@example.com" name="emailUserNomina" onChange={handlerUser}
									value={emailUserNomina} />
								<label htmlFor="inputEmail">Email</label>
							</div>
							<div className="form-floating mb-3">
								<input className="form-control" id="nombre" type="text" placeholder="Nombres" name='nombreUserNomina' onChange={handlerUser}
									value={nombreUserNomina} />
								<label htmlFor="Nombres">Nombres</label>
							</div>

							<div className="form-floating mb-3">
								<input className="form-control" id="apellido" type="text" placeholder="Apellidos" name="apellidoUserNomina" onChange={handlerUser}
									value={apellidoUserNomina} />
								<label htmlFor="Apellidos">Apellidos</label>
							</div>

							<div className="form-floating mb-3">
								<input className="form-control" id="telefono" type="number" placeholder="Telefono" name="telefonoUserNomina" onChange={handlerUser}
									value={telefonoUserNomina} />
								<label htmlFor="Telefono">Telefono</label>
							</div>

							<div className="form-floating mb-3">
								<input className="form-control" id="cedula" type="number" placeholder="Cedula" name="cedulaUserNomina" onChange={handlerUser}
									value={cedulaUserNomina} />
								<label htmlFor="Cedula">Cedula</label>
							</div>
							
							<div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                               <button className="btn btn-success"type='submit'>Registrar</button>
							</div>
						</form>
					</div>
					<div className="card-footer text-center py-3">
					    {exito ? (
						  <Exito mensaje='Usuario Creado con exito' />
					             ) : null}
					</div>
				</div>
			
			</div>
		</div><div dangerouslySetInnerHTML={{ __html: ' &nbsp;' }} /></>
		
	);
};

export default CrearUsuarioNomina;
