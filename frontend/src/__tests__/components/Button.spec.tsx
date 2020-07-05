import React from 'react';

import { render, fireEvent, wait } from '@testing-library/react';
import Button from '../../components/Button';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render a button', () => {
    const { getByPlaceholderText } = render(
      <Button placeholder="submit" type="submit" />,
    );

    expect(getByPlaceholderText('submit')).toBeTruthy();
  });

  it('should change background highlight rendering on mouse over', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Button placeholder="submit" type="submit" />,
    );

    const buttonElement = getByPlaceholderText('submit');
    const containerElement = getByTestId('input-container');

    fireEvent.mouseOver(buttonElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('background: #ff9000');
    });
  });

  it('should show loading text when propertie loading has present', async () => {
    const { getByTestId } = render(<Button type="submit" loading />);

    const containerElement = getByTestId('input-container');

    await wait(() => {
      expect(containerElement).toHaveTextContent('Loading...');
    });
  });
});
