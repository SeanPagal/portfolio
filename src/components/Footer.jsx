import React from "react"
import styled from "@emotion/styled"
import spooch from "images/oscar-icon.png"

const FooterContainer = styled("div")`
  padding-top: 3.75em;
  padding-bottom: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    max-width: 50px;
  }
`

const FooterAuthor = styled("a")`
  font-size: 0.75em;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  margin-top: 1.5em;

  &:hover {
    .FooterSpooch {
      animation-name: rotate;
      animation-duration: 1.5s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const FooterSpooch = styled("img")`
  max-width: 33px;
  margin-top: 0.25em;
`

const Footer = () => (
  <FooterContainer>
    <FooterAuthor href="https://www.marguerite.io/?utm_source=prist&utm_medium=footer&utm_campaign=prist_starter">
      © 2019 — Designed & developed by Marguerite Roth
      <FooterSpooch className="FooterSpooch" src={spooch} />
    </FooterAuthor>
  </FooterContainer>
)

export default Footer
