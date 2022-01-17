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

  input[type="date"]::-webkit-inner-spin-button,
  input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }

  input[type="time"]::-webkit-inner-spin-button,
  input[type="time"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }

  .error-message {
    font-size: 12px;
    font-weight: bold;

	  color: ${(props) => props.theme.colors.outflows};
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

  input {
    font-size: 14px;
    padding: 12px;
    border: none;
    border-bottom: 3px solid ${(props) => props.theme.colors.orange};
    border-radius: 10px;
  }

  textarea {
	  font-size: 14px;
    padding: 12px;
	  resize: none;
    border: none;
    border-bottom: 3px solid ${(props) => props.theme.colors.orange};
    border-radius: 10px;
  }

  input[type="checkbox"] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    /* Remove most all native input styles */
    appearance: none;
    /* For iOS < 15 */
    background-color: var(--form-background);
    /* Not removed via appearance */
    margin: 0;

    font: inherit;
    color: ${(props) => props.theme.colors.white};
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid ${(props) => props.theme.colors.white};
    border-radius: 0.4em;
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;
  }

  input[type="checkbox"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
    /* Windows High Contrast Mode */
    background-color: ${(props) => props.theme.colors.white};
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }

  input[type="checkbox"]:disabled {
    --form-control-color: var(--form-control-disabled);

    color: var(--form-control-disabled);
    cursor: not-allowed;
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

  .toast {
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
  }



`;
