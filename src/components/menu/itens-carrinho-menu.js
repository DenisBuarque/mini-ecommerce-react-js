import React from 'react';
import PropTypes from 'prop-types';
import { NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';

function ItensCarrinhoMenu (props)
{    
    function render()
    {
        // carrinho vazio
        if(props.produtos.length === 0)
        {
            return (
                <NavDropdown.Item href="">
                    <FontAwesomeIcon icon={faSadTear}/> Carrinho vazio...
                </NavDropdown.Item>
            );
        }
        // listagem de produtos
        const itens = props.produtos.map(produto => 
            <NavDropdown.Item key={produto.nome} href="">
                { produto.nome } - { produto.quantidade } x { produto.preco }
            </NavDropdown.Item>
        );

        return itens;
    }

    return render();
}

ItensCarrinhoMenu.propTypes = {
    produtos: PropTypes.array.isRequired
}

export default ItensCarrinhoMenu;