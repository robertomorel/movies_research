import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest} data-testid="input-container">
    {loading ? 'Loading...' : children}
  </Container>
);

export default Button;
