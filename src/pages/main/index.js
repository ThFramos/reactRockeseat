import React , {Component} from 'react';
import api from '../../services/api';
import { Link} from 'react-router-dom'

import './styles.css';

export default class Main extends Component {
    state ={ // o render fica sempre de olho nas variaveis de estado e sempre que ouver alteração ele muda automaticamente
        produto:[],//armazenara as alterações nesse aray
        productInfo: {}, // para armazenar alguns dados da api como paginas, quantidades
        page: 1, //armazenar a pagina inicial
    }
    componentDidMount() {// metodo executado assim que o component for exibido em tela
        this.loadProducts();
    }   
                                        // passa a paina inicial como 01 e será alterada com o pageNumber que foi passada como parametro
    loadProducts = async (page = 1) => { // usar arow functions sempre que criar uma função sua. Não consegue acessar o this caso fizer a funçaõ normal
        const response = await api.get(`/products?page=${page}`); //apos colocar o page como parametro para alterar a pagina, deve acrescentar o parametro na buscar

        const {docs, ...productInfo} = response.data; //irá manter docs e juntará os demais itens em productInfo

        this.setState({produto:docs, productInfo , page}); // alterar o valor da variavel'produto' por aquilo que estiver armazenado em docs e alterar o que estiver em productInfo por aquilo que estiver em productInfo. Como são nomes iguais, fica apenas 01
    }                                                         //precisa colocar o page para ir atualizando qual a pagina atual
    nextPage = ()=>{
        const {page, productInfo} =this.state;
        if (page === productInfo.pages)return //se a pagina for igual ao numero total de pagina ele apenas retorna. fica armazenada na variavel pages
        
        const pageNumber = page +1; // caso ele não for a ultima página não saira do programa pelo return e irá acrescentar 1 no n de pagina
        this.loadProducts(pageNumber)//passa o numero atual de pagina como parametro para o loadProducts
    }
        
    prevPage = ()=>{
        const {page} = this.state;
        if(page === 1)return

        const pageNumber = page -1;
        this.loadProducts(pageNumber);
    }
        

    render (){
        const {produto, page , productInfo} = this.state; // criada apenas para diminuir código ao chamar . Descontrução
    return (
        <div className="product-list">
            {produto.map(product =>( /// antes de criar a const->this.state.produto.map
                <article key={product._id}>
                    <strong>{product.title}</strong>
                    <p>{product.description}</p>
                
                    <Link to={`/products/${product._id}`}>Acessar</Link> {/* usa o Link no lugar do <a> e do to= no lugar do href */}
                </article>
                                  /* <h2 key={product._id}>{product.title}</h2> // deve acrescentar um valor unico para cada key */ 
            ))}
            <div className="actions">
                <button disabled={page ===1} onClick={this.prevPage}>Anterior</button> 
                <button disabled={page ===productInfo.pages} onClick={this.nextPage}>Próxima</button>{/* para chamar uam função no react sempre afzer em camelCase passando a funcao em chaves */}

            </div>
        </div>
    );  
    }
}