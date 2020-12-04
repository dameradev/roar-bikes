import { createGlobalStyle } from 'styled-components'
import { respondTo } from '../utils/respondTo'

const GlobalStyles = createGlobalStyle`
  :root {
    --blue: #009DFF;
    --black: #2E2E2E;
    --yellow: #ffc600;
    --white: #fff;
    --grey: #efefef;
  }
  html {
    box-sizing:border-box;
    background-size: 450px;
    background-attachment: fixed;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-size: 2rem;
    margin:0;
  }

  fieldset {
    border-color: rgba(0,0,0,0.1);
    border-width: 1px;
  }

  button {
    background: var(--blue);
    color: white;
    border: 0;
    padding: 0.6rem 1rem;
    border-radius: 2px;
    cursor: pointer;
    --cast: 2px;
    box-shadow: var(--cast) var(--cast) 0 var(--grey);
    text-shadow: 0.5px 0.5px 0 rgba(0,0,0,0.2);
    transition: all 0.2s;
    &:hover {
      --cast: 4px;
    }
  }

  /* .gatsby-image-wrapper img[src*=base64\\,] {
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
  } */
  ul {
    list-style: none;
    padding:0;
    margin: 0;
  }

  /* Scrollbar Styles */
  body::-webkit-scrollbar {
    width: 12px;
  }
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--blue) var(--white);
  }
  body::-webkit-scrollbar-track {
    background: var(--white);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--blue) ;
    border-radius: 6px;
    border: 3px solid var(--white);
  }

  hr {
    border: 0;
    height: 8px;    
    background-size: 1500px;
  }

  img {
    max-width: 100%;
  }

  .tilt {
    transform: rotate(-2deg);
    position: relative;
    display: inline-block;
  }
  .cart {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    
    text-align: center;
    &__mobile {
      display: none;
      ${respondTo.tabletMini`
        display: block;
      `}
    }
    &__desktop {
      ${respondTo.tabletMini`
        display: none;
      `}
      
    }
  }
  
`

export default GlobalStyles
