import styled from '@emotion/styled'
import React from 'react'

const FooterStyles = styled.footer`
  height: 50rem;
  width: 100%;
  padding: 5rem 0;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  background: #222222;
  color: white;
  h2,
  h3 {
    text-transform: uppercase;
  }

  h2 {
    font-size: 2.6rem;
    font-weight: bold;
  }
  h3 {
    font-size: 2rem;
    font-weight: bold;
  }
  input {
    width: 55rem;
    height: 5rem;
    padding: 0 2rem;
    font-size: 1.8rem;
  }
  .cancel-subscription {
    color: grey;
    cursor: pointer;
  }
  .bottom {
    width: 90vw;
    padding: 5rem;
    margin-top: 5rem;
    border-top: 2px solid grey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      a {
        padding-right: 1rem;
      }
    }
    ul {
      list-style: none;
      display: flex;
      gap: 1rem;
    }
  }
`

const Footer = () => {
  return (
    <FooterStyles>
      <h2>Subscribe to our newsletter</h2>
      <h3>Be the first to get the latest news about promotions</h3>
      <input type="text" placeholder="Your email address" />
      <p className="cancel-subscription">I wish to cancel my subscription</p>
      <div className="bottom">
        <div>
          <a>Can we help you?</a>
          <a>About us</a>
        </div>
        <ul className="social">
          <li>f</li>
          <li>I</li>
          <li>S</li>
        </ul>
      </div>
    </FooterStyles>
  )
}

export default Footer
