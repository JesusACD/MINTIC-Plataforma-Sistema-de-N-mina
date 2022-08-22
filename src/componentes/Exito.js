import { Fragment } from 'react';

const Exito = ({ mensaje }) => {
	return (
		<Fragment>
			<div className='alert alert-success' role='alert'>
				{mensaje}
			</div>
		</Fragment>
	);
};

export default Exito;
