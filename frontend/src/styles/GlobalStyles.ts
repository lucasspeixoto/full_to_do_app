import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100vh;
    background-color: ${(props) => props.theme.colors.primary};
  }

  *, button, input {
    border: 0;
    outline: 0;
    font-family: 'Segoe UI', 'Roboto', 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  button {
    cursor: pointer;
  }

  icon {
    font-size: 35px;
  }

  ::-webkit-scrollbar {
		width: 15px;
    background: transition;
    backdrop-filter: blur(20px);
	}

	::-webkit-scrollbar-thumb {
		background-color: ${(props) => props.theme.colors.secondary};
    border-radius: 20px;
	}

	::-webkit-scrollbar-thumb:hover {
		background-color: ${(props) => props.theme.colors.tertiary};
	}

  .error-message {
    font-size: 12px;
    font-weight: bold;

	  color: #d75757;
  }

  .form-field {
    font-size: 15px;

    width: 100%;

    margin: 5px 0;

    padding: 10px;

    border-radius: 5px;

    border: 3px solid ${(props) => props.theme.colors.white};

    &:hover {
      opacity: 0.9;
      border: 3px solid ${(props) => props.theme.colors.generic};
    }
  }

  textarea {
	  font-size: 5.5rem;
	  resize: none;
  }

  .modal {
    background: ${(props) => props.theme.colors.primary};

    display: flex;
    flex-direction: column;

    width: 500px;
    height: 300px;

    align-items: center;
    justify-content: center;
  }

  .unselect {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: -moz-none;
    -o-user-select: none;
    user-select: none;
  }

`;
