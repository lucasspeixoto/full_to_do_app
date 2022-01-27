import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Content = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;

  margin-top: 10px;
  margin-bottom: 60px;

  h1 {
    color: ${(props) => props.theme.colors.orange};
  }

  p {
    color: ${(props) => props.theme.colors.white};
    margin-top: 8px;
  }
`;

export const QrCodeArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

export const ValidationCode = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;

  span {
    color: ${(props) => props.theme.colors.white};
    text-transform: uppercase;
    font-weight: bold;
    margin-top: 8px;
  }

  input {
    font-size: 18px;
    padding: 10px;
    margin-top: 8px;
    text-align: center;
  }

  button {
    font-weight: bold;
    background: ${(props) => props.theme.colors.orange};
    color: ${(props) => props.theme.colors.white};
    font-size: 18px;
    padding: 10px;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    margin-top: 8px;

    &:hover {
      background: ${(props) => props.theme.colors.tertiary};
    }
  }
`;
