import styled from "styled-components";

interface ContainerProps {
  done: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 250px;
  height: 180px;

  cursor: pointer;

  padding: 5px;

  box-shadow: -3px 1px 13px -2px rgba(255, 163, 25, 0.73);

  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  transition: all 0.3s ease;
  opacity: ${props => props.done ? 0.5 : 1};
  
  &:hover {
    opacity: 0.5;
  }
`;

export const TopCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h3 {
    color: ${(props) => props.theme.colors.white};
    margin-top: 5px;
  }
`;

export const BottomCard = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  padding: 5px;

  strong {
    color: ${(props) => props.theme.colors.orange};
    font-weight: bold;
  }

  span {
    color: ${(props) => props.theme.colors.grey};
  }
`;
