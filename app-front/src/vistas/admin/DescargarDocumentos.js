const DescargarDocumentos = ({ title, boton }) => {
	return (
		<>
			<div className='row justify-content-center'>
				<div className='col-lg-5'>
					<div className='card shadow-lg border-0 rounded-lg mt-5 text-center'>
						<div className='card-header'>{title}</div>
						<div className='card-body '>
							<a href='#!' className='btn btn-primary'>
								{boton}
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DescargarDocumentos;
