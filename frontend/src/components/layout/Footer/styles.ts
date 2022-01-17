import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 40px;
  background: ${(props) => props.theme.colors.tertiary};
  border-top: 5px solid ${(props) => props.theme.colors.orange};

  position: fixed;

  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: ${(props) => props.theme.colors.white};
  }
`;
