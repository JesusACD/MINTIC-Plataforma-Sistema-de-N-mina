import axios from 'axios';
import { useState } from 'react/cjs/react.development';

const DescargarDocumentos = ({ title, boton }) => {
	const [cargar, setCargar] = useState(false);

	const descargarCertificado = async() => {
		setCargar(true);
		const id = JSON.parse(localStorage.getItem('user')).data.user._id;
		const cedula = JSON.parse(localStorage.getItem('user')).data.user.cedula;
		let ur = {};
		if (title === 'Solicitar Certificado Laboral') {
			ur.url = `https://app-nomina-project.herokuapp.com/employee/get-cert/${id}`;
		} else if (title === 'Descargar Reporte de Pago') {
			ur.url = `https://app-nomina-project.herokuapp.com/employee/report_payment/${id}`;
		}
		const url = ur.url;
		axios({
			url: url,
			method: "GET",
			responseType: "blob",
		  }).then((response) => {
			 const url = window.URL.createObjectURL(new  Blob([response.data]));
			 const link = document.createElement("a");
			 link.href = url;
			 link.setAttribute("download", `${cedula}.pdf`);
			 document.body.appendChild(link);
			 link.click();
		  });
		setTimeout(()=>{
			setCargar(false);
		},5000)
	};
	return (
		<>
			<div className='row justify-content-center'>
				<div className='col-lg-5'>
				  <div dangerouslySetInnerHTML={{ __html: ' &nbsp;' }} />
					  <div className='card border-1 rounded-lg mt-6 text-center'>
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
