import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://my-burger-builder-901d7.firebaseio.com/',
})

export default instance
