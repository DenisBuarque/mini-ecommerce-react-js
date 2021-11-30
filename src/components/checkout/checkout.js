import React, { useState } from 'react';
import { Form, Row, Col, Button, Modal, Container } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import ListarEstados from './lista-estados';
import ListaCidades from './lista-cidades';
import { Formik } from 'formik';
import * as yup from 'yup';
import { formatarCpf } from '../../utils/cpf-util';
import formatarCep from '../../utils/cep-util';
import axios from 'axios';

registerLocale('pt', pt);

function Checkout (props) {
    
    const CHECKOUT_URL =  'http://localhost:3001/mini-ecommerce/checkout/finalizar-compra';

    const [dataNascimento, setDataNascimneto] = useState(null);
    const [formEnviado, setFormEnviado] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showErroModal, setShowErroModal] = useState(false);

    const schema = yup.object({
        email: yup.string().email().required(),
        nomeCompleto: yup.string().required().min(5),
        //cpf: yup.string().required().min(14).max(14).test('cpf-valido','CPD inválido', (cpf) => validarCpf(cpf)),
        cpf: yup.string().required().min(14).max(14),
        endereco: yup.string().required().min(5),
        cidade: yup.string().required(),
        estado: yup.string().required(),
        cep: yup.string().required().min(9).max(9),
        emailPromocional: yup.string().required(),
        termosCondicoes: yup.string().oneOf([true])
    });

    function visivel(){
        return props.visivel ? null : 'hidden';
    }

    function handleDataNascimento(data)
    {
        setDataNascimneto(data);
    }

    function datePickerCss()
    {
        if(!formEnviado){
            return 'form-control';
        }
        if(dataNascimento){
            return 'form-control is-valid';
        } else {
            return 'form-control is-invalid';
        }
    }

    function handleContinuar()
    {
        setShowModal(false);
        props.handleExibirProduto();
    }

    function handleFecharErroModal()
    {
        setShowErroModal(false);
    }

    async function finalizarCompra(dados)
    {
        if(!dataNascimento){
            setFormEnviado(true);
            return;
        }
        dados.dataNascimento = dataNascimento;
        dados.produtos = JSON.stringify(props.produtos);
        dados.total = `R$ ${props.total}`;
        try {
            await axios.post(CHECKOUT_URL, dados);
            setShowModal(true);
            props.handleLimparCarrinho();
        } catch(err){
            setShowErroModal(true);
        }
    }

    return (
        <Container className={visivel()}>
            <h3 className="text-center">Finalizar compra</h3>
            
            <Formik 
                onSubmit={(values) => finalizarCompra(values)} 
                initialValues = {{
                    email: '',
                    nomeCompleto: '',
                    cpf: '',
                    endereco: '',
                    cidade: '',
                    estado: '',
                    cep: '',
                    termosCondicoes: false,
                    emailPromocional: 'S'
                }} 
                validationSchema={schema}>

                {({handleSubmit, handleChange, values, touched, errors}) => (
                    <Form onSubmit={handleSubmit} noValidate>
                        
                        <Form.Group as={Row} controlId="email">
                            <Form.Label column sm={3}>Email:</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="text" 
                                    name="email" 
                                    value={values.email} 
                                    onChange={handleChange} 
                                    isValid={touched.email && !errors.email} 
                                    isInvalid={touched.email && !!errors.email}
                                    placeholder="digite seu e-mail"/>
                                <Form.Control.Feedback type="invalid">
                                    Digite um e-mail válido!
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="nomeCompleto">
                            <Form.Label column sm={3}>Nome completo:</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="text" 
                                    name="nomeCompleto" 
                                    value={values.nomeCompleto} 
                                    onChange={handleChange} 
                                    isValid={touched.nomeCompleto && !errors.nomeCompleto} 
                                    isInvalid={touched.nomeCompleto && !!errors.nomeCompleto}
                                    placeholder="Digite seu nome completo"/>
                                <Form.Control.Feedback type="invalid">
                                    Digite seu nome completo (minino 10 caracteres).
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlIt="DataNascimento">
                            <Form.Label column sm={3}>Data de Nascimento:</Form.Label>
                            <Col sm={9}>
                                <DatePicker 
                                    locale="pt" 
                                    peekNextMonth 
                                    showMonthDropdown 
                                    showYearDropdown 
                                    dropdownMode="select" 
                                    dateFormat="dd/MM/yyyy" 
                                    placeholderText="Selecione a data" 
                                    withPortal 
                                    onChange={handleDataNascimento} 
                                    className={datePickerCss()} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="Cpf">
                            <Form.Label column sm={3}>Cpf:</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="text" 
                                    name="cpf" 
                                    value={values.cpf} 
                                    onChange={ e => {
                                        e.currentTarget.value = formatarCpf(e.currentTarget.value);
                                        handleChange(e);
                                    }} 
                                    isValid={touched.cpf && !errors.cpf} 
                                    isInvalid={touched.cpf && !!errors.cpf}
                                    placeholder="Digite seu Cpf"/>
                                <Form.Control.Feedback type="invalid">
                                    Digite um Cpf valido.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="endereco">
                            <Form.Label column sm={3}>Endereço:</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="text" 
                                    name="endereco" 
                                    value={values.endereco} 
                                    onChange={handleChange} 
                                    isValid={touched.endereco && !errors.endereco} 
                                    isInvalid={touched.endereco && !!errors.endereco}
                                    placeholder="Digite seu endereço"/>
                                <Form.Control.Feedback type="invalid">
                                    Digite seu endereço completo.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="estado">
                            <Form.Label column sm={3}>Estado:</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    as="select" 
                                    name="estado" 
                                    value={values.estado} 
                                    onChange={handleChange} 
                                    isValid={touched.estado && !errors.estado} 
                                    isInvalid={touched.estado && !!errors.estado}
                                    placeholder="Selecione um estado">
                                    <option value="">Selecione o estado</option>
                                    <ListarEstados />
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Selecione o seu estado.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="cidade">
                            <Form.Label column sm={3}>Cidade:</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    as="select" 
                                    name="cidade" 
                                    value={values.cidade} 
                                    onChange={handleChange} 
                                    isValid={touched.cidade && !errors.cidade} 
                                    isInvalid={touched.cidade && !!errors.cidade}
                                    placeholder="Selecione uma cidade">
                                    <option value="">Selecione a cidade</option>
                                    <ListaCidades estado={values.estado} />
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Selecione a cidade.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="cep">
                            <Form.Label column sm={3}>Cep:</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="text" 
                                    name="cep" 
                                    value={values.cep} 
                                    onChange={handleChange}  
                                    isValid={touched.cep && !errors.cep} 
                                    isInvalid={touched.cep && !!errors.cep}
                                    placeholder="Digite o cep"/>
                                <Form.Control.Feedback type="invalid">
                                    Digite o Cep
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="emailPromocional">
                            <Form.Label column sm={12}>Deseja receber email com promoções?</Form.Label>
                            <Form.Check 
                                inline 
                                type="radio" 
                                name="emailPromocional" 
                                value="S" 
                                label="Sim" 
                                id="promocaoSim" 
                                style={{ marginLeft: '15px' }} 
                                checked={values.emailPromocional === 'S'} 
                                onChange={handleChange} /> 
                            <Form.Check 
                                inline 
                                type="radio" 
                                name="emailPromocional" 
                                value="N" 
                                label="Não" 
                                id="promocaoNao" 
                                style={{ marginLeft: '15px' }} 
                                checked={values.emailPromocional === 'N'} 
                                onChange={handleChange} />
                        </Form.Group>

                        <Form.Group as={Row} controlId="termosCondicoes">
                            <Form.Label column sm={12}>Deseja receber email com promoções?</Form.Label>
                            <Form.Check 
                                name="termosCondicoes" 
                                label="Concorda com os termos e condições?" 
                                style={{ marginLeft: '15px' }} 
                                value={values.termosCondicoes} 
                                onChange={handleChange} 
                                isValid={touched.termosCondicoes && !errors.termosCondicoes} 
                                isInvalid={touched.termosCondicoes && !!errors.termosCondicoes} />
                        </Form.Group>

                        <Form.Group as={Row} controlId="termosCondicoes">
                            <Button type='submit' variant="success">Finalizar compra</Button>
                        </Form.Group>

                    </Form>
                )}

            </Formik>

            <Modal show={showModal} onHide={handleContinuar}>
                <Modal.Header closeButton>
                    <Modal.Title>Compra realizada com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Um email de confirmação foi enviado com os detalhes da transação.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleContinuar}>Continuar</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showErroModal} onHide={handleFecharErroModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Erro ao processar pedido!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Tente novamente em instantes.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleFecharErroModal}>Continuar</Button>
                </Modal.Footer>
            </Modal>
            
        </Container>
    );
}

Checkout.propTypes = {
    visivel: PropTypes.bool.isRequired,
    handleExibirProduto: PropTypes.func.isRequired,
    total: PropTypes.string.isRequired,
    produtos: PropTypes.object.isRequired,
    handleLimparCarrinho: PropTypes.func.isRequired
}

export default Checkout;