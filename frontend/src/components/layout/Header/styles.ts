import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 55px;
  background: ${(props) => props.theme.colors.tertiary};
  border-bottom: 5px solid ${(props) => props.theme.colors.orange};

  display: flex;

  padding-top: 2px;
`;

export const LeftSide = styled.div`
  width: 50%;
  height: 55px;
  display: flex;
  align-items: center;
  padding-left: 10px;

  gap: 20px;

  img {
    width: 100px;
    height: 40px;
  }
`;

export const RightSide = styled.div`
  width: 50%;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  a,
  button {
    color: ${(props) => props.theme.colors.white};
    font-weight: bold;
    font-size: 18px;
    text-decoration: none;
    margin: 0 5px;

    &:hover {
      color: ${(props) => props.theme.colors.orange};
      opacity: 0.5;
    }

    img {
      width: 25px;
      height: 30px;
    }

    span {
      background: ${(props) => props.theme.colors.white};
      color: ${(props) => props.theme.colors.orange};
      font-weight: bold;
      padding: 3px 7px;
      border-radius: 50%;
      position: relative;
      top: -20px;
      right: 10px;
    }
  }

  .active {
    color: ${(props) => props.theme.colors.orange};
    font-weight: bold;
  }

  .dividir::after {
    content: "|";
    margin: 0 10px;
    color: ${(props) => props.theme.colors.white};
  }

  button {
    font-size: 16px;
  }
`;
