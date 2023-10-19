import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Papa from 'papaparse';
import ModalLoading from '../ModalLoading';

import { showConfirmation } from '../../store/modules/Confirmation/actions';
import * as Styled from '../styleds';
import api from '../../services/api';

const Importador = ({ confirmacao }) => {

  const API_URL = process.env.REACT_APP_URL_API;
  
  const [loading, setLoading] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [progress, setProgress] = useState(0);

  const estados = {
    "AC": "acre",
    "AL": "alagoas",
    "AP": "amapa",
    "AM": "amazonas",
    "BA": "bahia",
    "CE": "ceará",
    "DF": "distrito federal",
    "ES": "espírito santo",
    "GO": "goiás",
    "MA": "maranhão",
    "MT": "mato grosso",
    "MS": "mato grosso do sul",
    "MG": "minas gerais",
    "PA": "para",
    "PB": "paraíba",
    "PR": "parana",
    "PE": "pernambuco",
    "PI": "piaui",
    "RJ": "rio de janeiro",
    "RN": "rio grande do norte",
    "RS": "rio grande do sul",
    "RO": "rondônia",
    "RR": "roraima",
    "SC": "santa catarina",
    "SP": "são paulo",
    "SE": "sergipe",
    "TO": "tocantins"
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setRegistros([]);
    Papa.parse(file, {
      header: true, // Assume a header row
      dynamicTyping: true, // Convert values to their appropriate types
      complete: (result) => {
        if (result.data) {
          processCsvData(result.data);
        }
      },
    });
  };

  const processCsvData = async (data) => {
    setLoading(true);
  
    try {
      for (let index = 0; index < data.length; index++) {
        const row = data[index];
  
        let dataBody = { 
          grupo: row['nm_grupo'] || '',
          razaoSocial: row['nm_razao_social'] || '',
          nomeFantasia: row['nm_fantasia'] || '',
          cnpj: row['nr_cnpj_frm'] || '',
          cnae: row['cd_cnae'] || '',
          area: row['ds_cnae'] || '',
          endereco: row['ds_logradouro'] || '',
          numero: row['ds_numero'] || '',
          bairro: row['ds_bairro'] || '',
          cep: row['ds_cep'] || '',
          estado: estados[row['sgl_estado'] || 'SP'],
          cidade: row['nm_cidade'] || '',
        };
  
        const response = await api.post('/empresas/importacao', dataBody);
        const registro = JSON.stringify(response.data);
        setRegistros((registros) => [...registros, registro]);
        setProgress(((index + 1) / data.length) * 100);
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Erro no processamento:', error);
      setLoading(false);
    }
  };
  
  
  if (loading) {
    return (
      <div>
        <progress value={progress} max={100} />
        <p>Importando...</p>
      </div>
    );
  }

  return (
    <Styled.Container>
      <div>
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </div>
      <div>
        {registros.map((registro, index) => (
          <p key={index}>{registro}</p>
        ))}
      </div>
    </Styled.Container>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.empresa.loading,
    error: state.empresa.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    confirmacao: (title, text, onConfirm) => dispatch(showConfirmation(title, text, onConfirm))
  };
};

export default connect(null, mapDispatchToProps)(Importador);