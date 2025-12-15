// Estilos globais - pode ser importado no App ou main.jsx
import { theme } from './theme'

export const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.fonts.family.body.join(', ')};
    font-size: ${theme.fonts.size.base};
    line-height: ${theme.fonts.lineHeight.normal};
    color: ${theme.colors.navy[900]};
    background-color: ${theme.colors.background.light};
    transition: background-color ${theme.transitions.base}, color ${theme.transitions.base};
  }

  body.dark {
    color: ${theme.colors.text.dark};
    background-color: ${theme.colors.background.dark};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.family.display.join(', ')};
    font-weight: ${theme.fonts.weight.bold};
    line-height: ${theme.fonts.lineHeight.tight};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: opacity ${theme.transitions.base};
  }

  a:hover {
    opacity: 0.8;
  }

  button {
    font-family: ${theme.fonts.family.body.join(', ')};
    cursor: pointer;
    transition: all ${theme.transitions.base};
  }

  input, textarea, select {
    font-family: ${theme.fonts.family.body.join(', ')};
  }
`

export default globalStyles
