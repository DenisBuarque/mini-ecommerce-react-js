import React, { useState } from 'react';
import ListaProdutos from './lista-produtos';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

function Produtos(props){

    const [exibirMensagem, setExibirMensagem] = useState(false);
    const [produto, setProduto] = useState('');

    function visivel()
    {
        return props.visivel ? null : 'hidden';
    }

    function exibirMsg(produto)
    {
        setExibirMensagem(true);
        setProduto(produto.nome);
        setTimeout(() => {
            setExibirMensagem(false);
        }, 3000);
    }

    return ( 
        <div className={visivel()}>
            <Alert variant="success" style={{ margin: '10px' }} show={exibirMensagem}>
                {produto} adicionado ao carrinho com sucesso!
            </Alert>
            <ListaProdutos 
                exibirMensagem={exibirMsg} 
                adicionarProduto={props.adicionarProduto} />
        </div>
    );
}

Produtos.propTypes = {
    visivel: PropTypes.bool.isRequired,
    adicionarProduto: PropTypes.func.isRequired
}

export default Produtos;