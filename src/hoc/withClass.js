import React from 'react'

const WithClass = (WrapperComponnet, className) => {
	return (props) => (
		<div className={className}>
			<WrapperComponnet {...props} />
		</div>
	)
}

export default WithClass
