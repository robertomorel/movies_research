import React from 'react';
import { render, fireEvent, act, wait } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import Dashboard from '../../pages/Dashboard';
import api from '../../services/api';

// const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

// -- Sempre que a biblioteca do 'react-router-dom' for chamada...
jest.mock('react-router-dom', () => {
  return {
    // -- Quero que o useHistory seja uma função vazia
    // useHistory: jest.fn(),
    // -- Quero que o useHistory seja uma função que possua uma outra função chamada push (que será uma função vazia. jest.fn())
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    // -- Quero que o Link seja um elemento genérico
    // -- Necessário chamar ambos, pois são os dois utilizados pelo react-router-dom
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

// -- Mockando o useToast.addToast para ser apenas uma função vazia
jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

const waitCustom = (amount = 0): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, amount));
};

const actWait = async (amount = 0): Promise<void> => {
  await act(async () => {
    await waitCustom(amount);
  });
};

describe('Dashboard page', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem');
    // -- Para apagar o histórico de uso do mockedHistoryPush por teste
    mockedHistoryPush.mockClear();
  });

  it('should be able to set a user by net ip', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const axiosMock = new MockAdapter(axios);

    axiosMock
      .onGet('https://api.ipify.org/?format=jsonp?callback=?')
      .reply(200, '187.18.220.48');

    const { getByTestId, getByText } = render(<Dashboard />);

    await actWait();

    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(getByTestId('user_ip')).toHaveTextContent('187.18.220.48');
    expect(getByText('187.18.220.48')).toBeTruthy();
  });

  it('should be able to list all reviews by user', async () => {
    const useStateSpy = jest.spyOn(React, 'useState');
    const apiMock = new MockAdapter(api);

    const user = '187.18.220.48';

    const data = [
      {
        _id: '5ee56821ff31d520348e3401',
        user: '187.18.220.48',
        movie_id: 'tt0304140',
        like: true,
        dislike: false,
      },
      {
        _id: '5ee56837ff31d520348e3402',
        user: '187.18.220.48',
        movie_id: 'tt1756545',
        like: true,
        dislike: false,
      },
    ];

    apiMock.onGet(`/reviews/${user}/all`).reply(200, data);

    render(<Dashboard />);

    await actWait();

    // -- TODO: completar!
    expect(useStateSpy).toHaveBeenCalled();
  });

  it('should be able to search for a movie successfully', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const useStateSpy = jest.spyOn(React, 'useState');
    const apiMock = new MockAdapter(api, { delayResponse: 2000 });

    const data = [
      {
        Title: 'Harry Potter and the Deathly Hallows: Part 2',
        Year: '2011',
        imdbID: 'tt1201607',
        Type: 'movie',
        Poster: 'https://www.endereco.com/imagem.jpg',
      },
      {
        Title: "Harry Potter and the Sorcerer's Stone",
        Year: '2001',
        imdbID: 'tt0241527',
        Type: 'movie',
        Poster: 'https://www.endereco.com/imagem.jpg',
      },
    ];

    /*
    apiMock.onGet('/movies').reply(config => {
      if (config.params.name === 'Harry Potter') {
        return [200, data];
      }

      return [200, data];
    });
    */
    apiMock
      .onGet('/movies', {
        params: {
          name: 'Harry Potter',
        },
      })
      .reply(200, data);

    const { getByText, getByPlaceholderText } = render(<Dashboard />);

    const searchField = getByPlaceholderText(
      'Enter the movie name for research',
    );

    const buttonElement = getByText('Search');

    fireEvent.change(searchField, { target: { value: 'Harry Potter' } });

    fireEvent.click(buttonElement);

    wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });

    // -- TODO: completar!
    expect(useStateSpy).toHaveBeenCalled();
    expect(setItemSpy).toHaveBeenCalledTimes(2);
    expect(setItemSpy).toHaveBeenCalledWith(
      'app_movie_flix#user',
      '187.18.220.48',
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      'app_movie_flix#search',
      'Harry Potter',
    );
  });

  it('should be able to search for a movie with error', async () => {
    const apiMock = new MockAdapter(api, { delayResponse: 2000 });

    const data = {
      status: 'error',
      message: 'You can´t find a movie without a id or name!',
    };

    apiMock
      .onGet('/movies', {
        params: {
          code: 'Harry Potter',
        },
      })
      .reply(400, data);

    const { getByText, getByPlaceholderText } = render(<Dashboard />);

    const searchField = getByPlaceholderText(
      'Enter the movie name for research',
    );

    const buttonElement = getByText('Search');

    fireEvent.change(searchField, { target: { value: 'Harry Potter' } });

    fireEvent.click(buttonElement);

    wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });

  // -- TODO: implementar!
  /*
  it('should be able to see liked or disliked movies', async () => {});
  */

  /*
  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');

    const buttonElement = getByText('Entrar');

    // -- Simulando um evento de um usuário com o fireEvent
    // -- Lembrando que nos eventos, para conseguimos encontrar o valor do campos, precisamos de uma função
    // -- Exemplo: onChange={(e) => e.target.value}
    fireEvent.change(emailField, { target: { value: 'johndoe@exemple.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');

    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if log in fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');

    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@exemple.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
  */
});
