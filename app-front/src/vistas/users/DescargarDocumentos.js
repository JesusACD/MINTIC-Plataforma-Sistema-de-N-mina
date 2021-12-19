import axios from 'axios';
import { useState } from 'react/cjs/react.development';

const DescargarDocumentos = ({ title, boton }) => {
	const [cargar, setCargar] = useState(false);

	const descargarCertificado = () => {
		setCargar(true);
		const id = JSON.parse(localStorage.getItem('user')).data.user._id;
		let ur = {};
		if (title === 'Solicitar Certificado Laboral') {
			ur.url = `https://app-nomina-project.herokuapp.com/employee/get-cert/${id}`;
		} else if (title === 'Descargar Reporte de Pago') {
			ur.url = `https://app-nomina-project.herokuapp.com/employee/report_payment/${id}`;
		}
		const url = ur.url;
		axios
			.get(url)
			.then((e) => {
				console.log(e.status);
				setCargar(false);
			})
			.catch((error) => {
				setCargar(false);
			});
		
	};
	return (
		<>
			<div className='row justify-content-center'>
				<div className='col-lg-5'>
					<div className='card shadow-lg border-0 rounded-lg mt-5 text-center'>
						<div className='card-header'>{title}</div>
						<div className='card-body '>
							{!cargar ? (
								<button
									className='btn btn-primary'
									onClick={descargarCertificado}>
									{boton}
								</button>
							) : (
								<button
									class='btn btn-primary'
									type='button'
									disabled>
									<span
										class='spinner-border spinner-border-sm'
										role='status'
										aria-hidden='true'></span>
									<span class='visually-hidden'>
										Loading...
									</span>
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DescargarDocumentos;
