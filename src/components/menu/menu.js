import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faCashRegister, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import ItensCarrinhoMenu from './itens-carrinho-menu';

function Menu(props)
{
    
    function calcularTotal()
    {
        if(props.produtos.length === 0){
            return '0,00';
        }
        let total = 0;
        props.produtos.forEach(produto => {
            let preco = produto.preco.replace(',', '.').replace('R$ ', '');
            total += parseFloat(preco) * produto.quantidade;
        });
        return total.toFixed(2).toString().replace('.', ',');
    }
    
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="">Mini ECommerce</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <NavDropdown 
                        title={
                            <div style={{ display: 'inline-block' }}>
                                <FontAwesomeIcon icon={faShoppingCart} />
                                Carrinho
                            </div>
                        }  
                        drop="left">

                            <NavDropdown.Item onClick={props.handleExibirProdutos} href="">
                                <FontAwesomeIcon icon={faShoppingBasket}/> 
                                <strong>Produtos</strong>
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                                <ItensCarrinhoMenu produtos={props.produtos} />
                            <NavDropdown.Divider/>
                            <NavDropdown.Item>
                                Total: { calcularTotal() }
                            </NavDropdown.Item>
                            <span className={ props.produtos.length ? 'hidden' : null }>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={ () => props.handleExibirCheckout(calcularTotal()) } href="" style={{ color: 'green' }}>
                                    <FontAwesomeIcon icon={faCashRegister}/>
                                    Finalizar compra
                                </NavDropdown.Item>
                            </span>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

Menu.propTypes = {
    produtos: PropTypes.array.isRequired,
    handleExibirProdutos: PropTypes.func.isRequired,
    handleExibirCheckout: PropTypes.func.isRequired
}

export default Menu;