import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom'

import './styles.css';

export default class Main extends Component {

    state = {
        products: [],
        productInfo: {},
        page : 1
    }

    // Carrega assim que inicializado
    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`)            // executa a chamada a API

        const { docs , ...productInfo } = response.data                     // armazena nas variaveis os dados da lista de produtos e as informações dos produtos nas respectivas variaveis

        this.setState({ products: docs, productInfo, page })                // Preenche a variavel em states com os products e productInfo
    }


    prevPage = () => {                                                      /* Função para próxima página */
        const { page, productInfo } = this.state                            // Busca qual é a página atual e qual é a o productInfo
        
        if(page === 1)                                                      // Não tem nenhuma página abaixo de um
            return

        const pageNumber = page - 1                                         // Caso seja a ultima, pega a anterior
        this.loadProducts(pageNumber)
    }


    nextPage = () => {                                                     /* Função para página anterior */
        const { page, productInfo } = this.state                           // Busca qual é a página atual e qual é a o productInfo

        if(page === productInfo.pages)                                     // Verifica se é a ultima página
            return

        const pageNumber = page + 1                                         // Caso não seja ultima página, pega a próxima página
        this.loadProducts(pageNumber)
    }


    render() {
        const { products , page , productInfo} = this.state

        return (
            <div className="product-list">
                { products.map(products => (
                    <article key={ products._id }>
                        <strong> { products.title }</strong>
                        <p>{ products.description }</p>

                        <Link to={`/products/${products._id}`}>Acessar Detalhes</Link>
                    </article>
                )) }

                <div className="actions">
                    <button onClick={this.prevPage} disabled={page === 1}>Anterior</button>
                    <button onClick={this.nextPage} disabled={page === productInfo.pages}>Próximo</button>
                </div>

            </div>
        )
    }
}


