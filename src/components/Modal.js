import React from 'react';
import styled from "styled-components";

const StyledModal = styled.div.attrs(props => ({
    className: 'modal',
}))`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 50%;
  z-index: 100;
  display: block;
`

/**
 * Modal screen. Used as a background for forms.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

function Modal(props) {
    return (
        <StyledModal onClick={props.handleClick} className={props.className}>
            {props.children}
        </StyledModal>
    );
}

export default Modal;
