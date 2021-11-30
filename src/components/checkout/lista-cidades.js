import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function ListaCidades(props){

    const CIDADES_URL = 'http://localhost:3001/mini-ecommerce/estado/:estado/cidades';
    const [cidades, setCidade] = useState([]);
    
    useEffect(() => {
        async function obterCidades(){
            try {
                let { data } = await axios.get(CIDADES_URL.replace(':estado', props.estado));
                setCidade(data);
            } catch (err) {
                setCidade([]);
            }
        }

        if(props.estado !== ''){
            obterCidades();
        }
    }, [props.estado]);

    return cidades.map(cidade => 
        <option key={cidade} value={cidade}>{cidade}</option>
        );
}

ListaCidades.proptypes = {
    estados: PropTypes.string.isRequired
}

export default ListaCidades;