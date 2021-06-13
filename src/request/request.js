import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8088',
  timeout: 5000
})

export default service;
