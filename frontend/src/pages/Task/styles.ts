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

export const FormArea = styled.div`
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

  .active {
    opacity: 1;
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
    opacity: 0.5;
    
    &:hover {
      opacity: 1;
    }
  }
`;

export const FormField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;

  span {
    font-size: 18px;
    color: ${(props) => props.theme.colors.white};
    margin-bottom: 5px;
  }

  img {
    width: 20px;
    height: 20px;

    position: relative;
    left: 93%;
    bottom: 45px;
  }
`;

export const Options = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  button {
    font-size: 18px;
    font-weight: bold;
    color: ${(props) => props.theme.colors.white};
    border: none;
    background: none;

    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  div {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 5px;
    color: ${(props) => props.theme.colors.orange};
  }
`;

export const SendArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  button {
    width: 100%;
    height: 35px;
    font-size: 18px;
    font-weight: bold;
    background-color: ${(props) => props.theme.colors.orange};
    color: ${(props) => props.theme.colors.white};
    border-radius: 10px;

    &:hover {
      opacity: .7;
    }

    &:disabled {
      opacity: .5;
      cursor: not-allowed;
    }
  }
`
