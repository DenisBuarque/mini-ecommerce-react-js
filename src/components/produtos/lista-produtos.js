import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import placeholder from '../../imagens/280x160.jpg';
import PropTypes from 'prop-types';

function ListaProdutos(props){

    const produtos = [
        {nome: 'Curso React JS', preco: '27,90'},
        {nome: 'Curso JavaScript', preco: '32,90'},
        {nome: 'Curso NodeJS', preco: '22,90'},
        {nome: 'Curso Laravel 8', preco: '28,90'},
        {nome: 'Curso Flutter Design', preco: '27,50'},
        {nome: 'Curso Go Lang', preco: '27,00'},
        {nome: 'Curso Laravel Vue JS', preco: '25,90'},
        {nome: 'Curso Php 8', preco: '19,90'},
    ];

    function handleComprar(event, produto)
    {
        event.preventDefault();
        props.adicionarProduto(produto);
        props.exibirMensagem(produto);
    }

    function render(){
        let key = 1;
        const cards = produtos.map(produto => 
            <Card key={key++} style={{ width: '18rem', margin: '10px', float: 'left'}}>
                <Card.Img variant="top" src={placeholder}/>
                <Card.Body className="text-center">
                    <Card.Title style={{ height: '40px'}}>
                        { produto.nome }
                    </Card.Title>
                    <Card.Text>
                        Texto da descrição do produto...
                    </Card.Text>
                    <Button 
                        variant="success" 
                        style={{ width: '100%' }} 
                        onClick={(event) => handleComprar(event,produto)}>
                        Comprar { produto.preco}
                    </Button>
                </Card.Body>
            </Card>
        );
        return cards;
    }

    return render();
}

ListaProdutos.propTypes = {
    adicionarProduto: PropTypes.func.isRequired,
    exibirMensagem: PropTypes.func.isRequired
}

export default ListaProdutos;