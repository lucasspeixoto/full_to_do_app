import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding-top: 10px;
  padding-bottom: 10px;
`;

export const Form = styled.div`
  width: 50%;
`;

export const IconsArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  margin-bottom: 10px;

  .inative {
    opacity: 0.5;
  }

  gap: 15px;

  button {
    background: none;
    border: none;
  }

  img {
    width: 50px;
    height: 50px;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
`;

export const Input = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  span {
    font-size: 22px;
    color: ${(props) => props.theme.colors.white};
    margin-bottom: 5px;
  }

  input {
    font-size: 16px;
    padding: 15px;
    border: none;
    border-bottom: 3px solid ${(props) => props.theme.colors.orange};
    border-radius: 10px;
  }
`;
