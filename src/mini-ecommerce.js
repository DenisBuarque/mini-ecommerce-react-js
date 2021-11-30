import React, { useState } from 'react';
import './mini-ecommerce.css';
import Menu from './components/menu/menu';
import Produtos from './components/produtos/produtos';
import Checkout from './components/checkout/checkout';

function MiniEcommerce() {

  const [carrinho, setCarrinho] = useState({ produtos: []});
  const [exibirProduto, setExibirProduto] = useState(true);
  const [exibirCheckout, setExibirCheckout] = useState(false);
  const [total, setTotal] = useState('0.00');

  function adicionarProduto(produto)
  {
    // cria uma copia do obeto carrinho
    const objCarrinho = Object.assign({}, carrinho);
    // atualizara quantidade
    let novoProduto = true;
    objCarrinho.produtos.forEach((prod, indice) => {
      if(prod.nome === produto.nome){
        objCarrinho.produtos[indice].quantidade++;
        novoProduto = false;
      }
    });
    // adicionar novo produto ao carrinho
    if(novoProduto){
      objCarrinho.produtos.push({
        nome: produto.nome, preco: produto.preco, quantidade: 1
      });
    }
    setCarrinho(objCarrinho);
  }

  function handleExibirProdutos ()
  {
    setExibirCheckout(false);
    setExibirProduto(true);
  }

  function handleExibirCheckout(total)
  {
    setExibirCheckout(true);
    setExibirProduto(false);
    setTotal(total);
  }

  function handleLimparCarrinho()
  {
    setCarrinho({ produtos: [] });
  }

  return (
    <div>
      <Menu 
        produtos={carrinho.produtos} 
        handleExibirProdutos={handleExibirProdutos} 
        handleExibirCheckout={handleExibirCheckout} />

      <Produtos 
        visivel={exibirProduto} 
        adicionarProduto={adicionarProduto} />

      <Checkout 
        visivel={exibirCheckout} 
        handleExibirProdutos={handleExibirProdutos} 
        total={total}
        produtos={carrinho} 
        handleLimparCarrinho={handleLimparCarrinho} />
      
    </div>
  );
}

export default MiniEcommerce;
