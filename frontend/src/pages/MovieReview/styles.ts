import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ReviewProps {
  like: boolean | null;
  dislike: boolean | null;
}

export const Container = styled.div`
  position: relative;
`;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
    color: #999591;

    svg {
      width: 20px;
      height: 20px;
      transition: 0.2s;
    }

    &:hover {
      color: ${shade(0.2, '#ff9f1c')};
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    strong {
      color: #ff9f1c;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const MovieInfo = styled.section<ReviewProps>`
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 210px;
      height: 305px;
      border-radius: 3%;
    }

    div {
      margin-left: 24px;

      h1 {
        font-size: 36px;
      }

      h4 {
        font-size: 12px;
        color: #6c6c80;
        font-weight: 100;

        /* Regra para a borda ficar vermelha caso exista erro no campo */
        ${props =>
          props.like &&
          css`
            color: #497300;
          `}

        /* Regra para o container ficar laranja caso o input esteja em foco. */
        ${props =>
          props.dislike &&
          css`
            color: #ff0000;
          `}

      }

      p {
        margin-top: 8px;
        font-weight: 500;

        span {
          color: #ff9f1c;
          display: flex;
          align-items: center;
        }
      }

      div {
        margin-top: 20px;
        margin-left: 0px;

        > p {
          color: #ff9f1c;
          font-weight: 500;

          & + p {
            margin-top: 0px;
            color: #fff;
            font-weight: 400;
          }
        }
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }

      strong {
        display: block;
        font-size: 26px;
        color: #ff9f1c;
      }

      span {
        display: block;
        margin-top: 4px;
        color: #6c6c80;
      }
    }
  }
`;

export const ReviewActions = styled.aside`
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #3e3b47;
    padding: 30px 24px;
    border-radius: 5px;

    button {
      margin: 0 auto;
      border: 0;
      background: transparent;
      color: #999591;
      margin-top: 17px;
    }

    div {
      content: '';
      padding: 0;
      width: 1px;
      height: 100px;
      background: #ff9f1c;
    }

    svg {
      width: 60px;
      height: 60px;
      color: #ff0101;
      transition: 0.2s;

      &:hover {
        color: ${shade(0.2, '#a00000')};
      }
    }
  }
`;
