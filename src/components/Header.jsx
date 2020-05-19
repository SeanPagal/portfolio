import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import { Flex } from "rebass"

const HeaderLinks = styled("div")`
  justify-content: flex-end;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 32px auto;

  a {
    color: currentColor;
    text-decoration: none;
    border-bottom: 3px solid transparent;
    font-weight: 600;
    font-size: 0.95em;

    padding-bottom: 1.25em;
    padding-top: 0.25em;
    padding-right: 46px;

    position: relative;

    &:after {
      position: absolute;
      content: "";
      bottom: 0;
      width: 18px;
      height: 3px;
      background: transparent;
      bottom: -3px;
      right: 50%;
      margin-right: -9px;
      transition: 100ms ease-in-out background;
    }

    &:hover {
      &:after {
        transition: 100ms ease-in-out background;
      }
    }

    &.Link--is-active {
      &:after {
        transition: 100ms ease-in-out background;
      }
    }
  }
`

const Header = () => (
  <Flex flexDirection="row" width={1} justifyContent="flex-end">
    <HeaderLinks>
      <Link activeClassName="Link--is-active" to="/">
        Home
      </Link>
      <Link activeClassName="Link--is-active" to="/pixel-art">
        Pixel Art
      </Link>
      <Link activeClassName="Link--is-active" to="/contact">
        Contact
      </Link>
      {/* <Link activeClassName="Link--is-active" to="/clients">
        Clients
      </Link> */}
    </HeaderLinks>
  </Flex>
)

export default Header
