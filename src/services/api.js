import axios from 'axios';
//criação de variavel para armazenar a url base
const api = axios.create ({ baseURL:'https://rocketseat-node.herokuapp.com/api'});

export default api