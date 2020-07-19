import React , {Component}from 'react';
import api from '../../services/api';
import './styles.css';
import {Link} from 'react-router-dom'

export default class Product extends Component {
    state = {
        product:{}
    };
    async componentDidMount(){
        const { id } = this.props.match.params; //desestruturacao para pegar o id do produto da rota
        
        
        const response = await api.get(`/products/${id}`); //pegar as informações do produto
        
        this.setState({product: response.data}) //atualizar as informações com setState
        
    }
    render() {
        const { product } = this.state; // desestruturação para facilitar a digitação
        

        return (
            <div className="product-info">
                <h1>{product.title}</h1>
                <p>{product.description}</p>

                <p>
                    URL: <a href={product.url}>{product.url}</a>
                </p>
                <div className="link">
                    <Link to={'/'}>Voltar</Link>
                </div>
                
            </div>
        );
    }
}
