import React from 'react';

const ConditionalRender = (props) =>
{
	try {
		return (<>{props.condition ? props.children : null}</>)
	}
	catch (e)
	{
		return (<></>)
	}
};

export default ConditionalRender;