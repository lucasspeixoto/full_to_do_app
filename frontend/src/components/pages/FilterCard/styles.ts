import styled from "styled-components";

interface ContainerProps {
  actived: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 230px;
  height: 60px;
  background: ${(props) => (props.actived ? "#ee6b26" : "#20295f")};
  cursor: pointer;
  padding: 10px;

  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  img {
    width: 30px;
    height: 30px;

    margin-top: 10px;
  }

  span {
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    align-self: flex-end;

    margin-bottom: 10px;
  }

  &:hover {
    background: #ee6b26;
  }
`;
