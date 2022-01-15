import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const FilterArea = styled.div`
  width: 100%;

  display: flex;
  flex-wrap: wrap;

  justify-content: space-around;

  margin-top: 30px;
  gap: 8px;

  button {
    background: none;
    border: none;
  }
`;

export const Title = styled.div`
  width: 95%;
  border-bottom: 1px solid ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: center;
  margin-top: 10px;

  h2 {
    color: ${(props) => props.theme.colors.white};
    position: relative;
    top: 10px;
    background: ${(props) => props.theme.colors.primary};
    padding: 0 20px;
  }
`;

export const TasksArea = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 70px;
  gap: 20px;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.white};
  }
`;
