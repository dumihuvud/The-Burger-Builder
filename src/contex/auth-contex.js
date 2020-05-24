import React from 'react'

const authContex = React.createContext({
	authenticated: false,
	login: () => {},
})

export default authContex
