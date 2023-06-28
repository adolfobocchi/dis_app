import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Logout from '../../components/Logout';
import Titulo from '../../components/Titulo';
import Area from '../../components/Area';
import Setor from '../../components/Setor';
import Funcao from '../../components/Funcao';
import Processo from '../../components/Processo';
import Recurso from '../../components/Recurso';
import Risco from '../../components/Risco';
import Causa from '../../components/Causa';
import Medida from '../../components/Medida';
import Probabilidade from '../../components/Probabilidade';
import NivelRisco from '../../components/NivelRisco';
import Severidade from '../../components/Severidade';
import Proposta from '../../components/Proposta';

const Container = styled.div`
  background: #FFF;
  display: flex;
  min-height: 100vh;
  width: 100vw;
`;

const Menu = styled.div`
  width: 200px;
  background-color: #f8f8f8;
  padding: 20px;
`;

const MenuItem = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 10px;
`;


const HomePainel = () => {
    return (
      <><h3>Utilize o menu lateral para navegar no sistema.</h3></>
    )
  }

function PainelPage({usuario}) {
    
    /*const menuItems = [
        { key: 0, label: "Painel", component: <HomePainel /> },
        { key: 14, label: "Sair", component: <Logout /> },
      ]*/
      const [menuItems, setMenuItems] = useState([
        { id: 1, label: 'Painel', expanded: false, sections:[], component: <HomePainel /> },
        {
          id: 2,
          label: 'Cadastro',
          expanded: false,
          sections: [
            { id: 1, label: 'Areas', expanded: false, component: <Area /> },
            { id: 2, label: 'Setores', expanded: false, component: <Setor /> },
            { id: 3, label: 'Funções', expanded: false, component: <Funcao /> },
            { id: 4, label: 'Processos', expanded: false, component: <Processo /> },
            { id: 5, label: 'Recursos', expanded: false, component: <Recurso /> },
            { id: 6, label: 'Riscos', expanded: false, component: <Risco /> },
            { id: 7, label: 'Causas', expanded: false, component: <Causa /> },
            { id: 8, label: 'Medidas', expanded: false, component: <Medida /> },
            { id: 9, label: 'Probabilidades', expanded: false, component: <Probabilidade /> },
            { id: 10, label: 'Severidades', expanded: false, component: <Severidade /> },
            { id: 11, label: 'Niveis Risco', expanded: false, component: <NivelRisco /> },
            { id: 12, label: 'Propostas Controle', expanded: false, component: <Proposta  /> },
          ],
        },
        
        { id: 3, label: 'DIS', expanded: false, sections:[], component: <Area /> },
        { id: 4, label: 'Relatórios', expanded: false, sections:[], component: <Area /> },
        { id: 5, label: 'Sair', expanded: false, sections:[], component: <Logout /> },
      ]);
    const [selectedMenuItem, setSelectedMenuItem] = useState(menuItems[0]);
    
    useEffect(()=> {
    },[])

    const toggleSection = (itemId, event) => {
      event.stopPropagation();
      setMenuItems((prevState) =>
        prevState.map((item) => {
          if (item.id === itemId) {
            return { ...item, expanded: !item.expanded };
          }
          return item;
        })
      );
    };

    const handleMenuItemClick = (menuItem, event) => {
      event.stopPropagation();
        setSelectedMenuItem(menuItem);
    };
    return(
        <Container>
      <Menu>
        {menuItems.map((menuItem) => (
          <MenuItem
            key={menuItem.id}
            onClick={(event) => { (menuItem.sections && menuItem.sections.length > 0) ? toggleSection(menuItem.id, event) : handleMenuItemClick(menuItem, event)}}
            style={{
              fontWeight: selectedMenuItem.key === menuItem.key ? 'bold' : 'normal',
            }}
          >
            {menuItem.label}
            {menuItem.sections && menuItem.sections.length > 0 && (
              <Section>
                {menuItem.expanded &&
                  menuItem.sections.map((section) => (
                    <div key={section.id}>
                      <div onClick={(event) => handleMenuItemClick(section, event)}>{section.label}</div>
                      
                    </div>
                  ))}
              </Section>
            )}
          </MenuItem>
        ))}
      </Menu>
      <Content>
        <Titulo titulo={selectedMenuItem.label} ></Titulo>
        {selectedMenuItem.component}
      </Content>
    </Container>

    );
}

const mapStateToProps = state => {
    return {
      usuario: state.usuario.usuario,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      null: null
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(PainelPage);