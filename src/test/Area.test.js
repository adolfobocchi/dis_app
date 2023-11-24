import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Para adicionar expect.extend
import { Provider } from 'react-redux'; // Se o seu componente estiver usando Redux
import configureStore from 'redux-mock-store'; // Se o seu componente estiver usando Redux
import Area from '../components/Area';


// Se o seu componente estiver usando Redux, crie um mock do store
const mockStore = configureStore([]);
const store = mockStore({
  area: {
    loading: false,
    areas: [{ _id: '1', nome: 'Teste', ativo: true }],
    error: null,
    page: 1,
  },
});

// Se o seu componente estiver usando Redux, envolva o componente no Provider
const renderWithRedux = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Area Component', () => {
  it('renders without crashing', () => {
    renderWithRedux(<Area />);
    // Ou render(<Area />); se o componente não estiver usando Redux

    // Adicione seus testes aqui, por exemplo:
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
    // ... outros testes

    // Exemplo de teste de clique:
    fireEvent.click(screen.getByText('Salvar'));

    // Para verificar se uma ação assíncrona foi chamada, você pode usar 'waitFor':
    // await waitFor(() => expect(screen.getByText('Algum Texto')).toBeInTheDocument());
  });
});
