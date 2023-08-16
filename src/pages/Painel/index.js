import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Logout from '../../components/Logout';
import Titulo from '../../components/Titulo';
import Area from '../../components/Area';
import Setor from '../../components/Setor';
import Funcao from '../../components/Funcao';
import Perigo from '../../components/Perigo';
import Monitoramento from '../../components/Monitoramento';
import Risco from '../../components/Risco';
import Causa from '../../components/Causa';
import Medida from '../../components/Medida';
import Probabilidade from '../../components/Probabilidade';
import NivelRisco from '../../components/NivelRisco';
import Severidade from '../../components/Severidade';
import PlanoAcao from '../../components/PlanoAcao';
import Dis from '../../components/Dis';
import { MdDashboard, MdDescription, MdDocumentScanner, MdEdit, MdHomeWork, MdKeyboardArrowDown, MdKeyboardArrowRight, MdLock, MdLogout } from 'react-icons/md';
import NavBar from '../../components/Navbar';
import { AreaFlex, AreaWidth } from '../../components/styleds';
import Atividade from '../../components/Atividade';
import Usuario from '../../components/Usuario';
import Empresa from '../../components/Empresa';

const Container = styled.div`
  background: #FFF;
  display: flex;
  min-height: 100vh;
  width: calc(100vw - 17px);
`;

const Menu = styled.div`
  width: 200px;
  background-color: #f8f8f8;
  padding: 20px;
  background: linear-gradient(#212934, #5BAE54);
  color: #FFF;
  
`;

const MenuItem = styled.div`
  margin-bottom: 5px;
  cursor: pointer;
  display: flex;
  font-weight: 300;
  font-size: 1em;
  padding: 5px;
  align-items: center;
  &:hover {
    background: #666666;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  width: calc(100vw - 217px);
`;

const Section = styled.div`
  margin-bottom: 10px;
  display: block;
  font-weight: 300;
  font-size: 0.9em;
`;

const SectionItem = styled.div`
  padding-left: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 0.9em;
  cursor: pointer;
  &:hover {
    background: #666666;
  }
`;

const HomePainel = () => {
  return (
    <><h3>Utilize o menu lateral para navegar no sistema.</h3></>
  )
}

function PainelPage({ usuario }) {
  const [menuItems, setMenuItems] = useState([
    { id: 101, label: 'Painel', expanded: false, sections: [], component: <HomePainel />, icon: <MdDashboard /> },
    { id: 102, label: 'Empresas', expanded: false, sections: [], component: <Empresa />, icon: <MdHomeWork /> },
    {
      id: 103,
      label: 'Cadastros',
      expanded: false,
      icon: <MdEdit />,
      sections: [
        { id: 1, label: 'Ramo de Atividade', expanded: false, component: <Area /> },
        { id: 2, label: 'Setores', expanded: false, component: <Setor /> },
        { id: 3, label: 'Funções', expanded: false, component: <Funcao /> },
        { id: 4, label: 'Atividades realizadas', expanded: false, component: <Atividade /> },
        { id: 5, label: 'Condição de perigo', expanded: false, component: <Perigo /> },
        { id: 6, label: 'Riscos', expanded: false, component: <Risco /> },
        { id: 7, label: 'Possíveis lesões', expanded: false, component: <Causa /> },
        { id: 8, label: 'Medidas de controle ', expanded: false, component: <Medida /> },
        { id: 9, label: 'Probabilidades', expanded: false, component: <Probabilidade /> },
        { id: 10, label: 'Severidades', expanded: false, component: <Severidade /> },
        { id: 11, label: 'Niveis Risco', expanded: false, component: <NivelRisco /> },
        { id: 12, label: 'Planos de ação', expanded: false, component: <PlanoAcao /> },
        { id: 13, label: 'Formas de monitoramento', expanded: false, component: <Monitoramento /> },
      ],
    },

    { id: 104, label: 'D.I.S', expanded: false, sections: [], component: <Dis />, icon: <MdDocumentScanner /> },
    { id: 105, label: 'Relatórios', expanded: false, sections: [], component: <Area />, icon: <MdDescription /> },
    {
      id: 106, label: 'Segurança', expanded: false,
      sections: [
        { id: 14, label: 'Usuários', expanded: false, component: <Usuario /> },
      ],
      icon: <MdLock />
    },
    { id: 106, label: 'Sair', expanded: false, sections: [], component: <Logout />, icon: <MdLogout /> },
  ]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(menuItems[0]);

  useEffect(() => {
  }, [])

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
  return (
    <>
      <NavBar />
      <Container>
        <Menu>
          {menuItems.map((menuItem) => (
            <>
              <MenuItem
                key={menuItem.id}
                onClick={(event) => { (menuItem.sections && menuItem.sections.length > 0) ? toggleSection(menuItem.id, event) : handleMenuItemClick(menuItem, event) }}
              >
                <AreaWidth style={{ width: 20 }}>{menuItem.icon}</AreaWidth>  <AreaFlex>{menuItem.label}</AreaFlex> <AreaWidth style={{ width: 20, justifyContent: 'flex-end' }} >{menuItem.expanded ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}</AreaWidth>
              </MenuItem>
              {menuItem.sections && menuItem.sections.length > 0 && (
                <Section>
                  {menuItem.expanded &&
                    menuItem.sections.sort((a, b) => a.label.localeCompare(b.label)).map((section) => (
                      <SectionItem key={section.id}>
                        <div onClick={(event) => handleMenuItemClick(section, event)}>{section.label}</div>
                      </SectionItem>
                    ))}
                </Section>
              )}
            </>
          ))}
        </Menu>
        <Content>
          <Titulo titulo={selectedMenuItem.label} ></Titulo>
          {selectedMenuItem.component}
        </Content>
      </Container>
    </>
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