import styled, { keyframes } from "styled-components";

const animate = keyframes`

  0%{
    transform: translateX(-200px);
    opacity: 0;
  }

  50%{
    opacity: .3;
  }
  100%{
    transform: translateX(0px);
    opacity: 1;
  }

`;

export const Container = styled.div`
  grid-area: CT;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};
`;

export const TitleContainer = styled.div`
  display: grid;
  grid-area: title;

  grid-template-rows: 1fr 1fr;
  grid-template-areas: "title title";

  > h1 {
    color: ${(props) => props.theme.colors.white};

    &::after {
      content: "";
      display: block;
      width: 55px;
      border-bottom: 10px solid ${(props) => props.theme.colors.orange};
      border-radius: 10px;
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  grid-area: buttons;

  grid-template-rows: 1fr 1fr;
  grid-template-areas: "buttons buttons";
`;
