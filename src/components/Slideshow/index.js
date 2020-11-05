import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import BackgroundSlider from 'gatsby-image-background-slider'
import styled from '@emotion/styled'

const SlideshowStyles = styled.div`
  height: 60rem;
  overflow: hidden;
  position: relative;
  font-size: 5rem;
  color: white;

  .caption {
    text-transform: uppercase;
    position: absolute;

    top: 20vh;
    left: 10%;
    width: 40vw;
    display: flex;
    flex-direction: column;

    button {
      width: fit-content;
      align-self: flex-start;
      background: none;
      border: 5px solid var(--blue);
      font-size: 2.5rem;
      padding: 1rem 3rem;
      text-transform: uppercase;
      box-shadow: none;
      /* color: ; */
    }
  }
`
const Slideshow = ({ slidesCaptions }) => {
  return (
    <SlideshowStyles>
      <BackgroundSlider
        className="slider"
        query={useStaticQuery(graphql`
          query {
            backgrounds: allFile(filter: { name: { regex: "/slideshow/i" } }) {
              nodes {
                relativePath
                childImageSharp {
                  fluid(maxHeight: 600) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        `)}
        initDelay={2} // delay before the first transition (if left at 0, the first image will be skipped initially)
        transition={4} // transition duration between images
        duration={8} // how long an image is shown
        // specify images to include (and their order) according to `relativePath`
        images={['slideshow-person-driving.jpg', 'slideshow-new-line-up.jpg']}
      >
        {/* Captions in sync with background images*/}
        {slidesCaptions.map(caption => (
          <div key={caption} className="caption">
            <p>{caption.text}</p>
            <button>{caption.button}</button>
          </div>
        ))}
      </BackgroundSlider>
    </SlideshowStyles>
  )
}

export default Slideshow
