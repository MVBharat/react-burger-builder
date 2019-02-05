import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-builder-285b6.firebaseio.com/'
})

export default instance