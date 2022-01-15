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
