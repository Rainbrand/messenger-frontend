import React, {useRef, useState} from 'react';
import styled from "styled-components";
import {Button, TextField} from "@material-ui/core";

const StyledInputForm = styled.div.attrs(props => ({
    className: "inputForm"
}))`
  
  .inputForm__form{
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 0px 11px -3px #BCBCBC;
    width: 300px;
    height: 200px;
  }
  
  .inputForm__title{
    font-weight: bold;
  }

  .inputForm__text{
    margin: 0;
  }
`

/**
 * Basic form component for entering info required to join or create room.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

function InputForm(props) {
    const [input, setInput] = useState();
    const inputRef = useRef()

    return (
        <StyledInputForm className={props.className}>
            <form className="inputForm__form" onSubmit={event => {
                props.handleSubmit(event, input)
            }}>
                <div className="inputForm__title">{props.title}</div>
                <TextField ref={inputRef} id="standard-basic" label={props.textField} required={props.required}
                           onChange={(e) => setInput(e.target.value)}/>
                <Button className="inputForm__button" variant="contained" color="primary" type="submit">
                    Submit
                </Button>
                {props.optionalText ? <div className="inputForm__optionalText">{props.optionalText}</div> : null}
            </form>
        </StyledInputForm>
    )
}
    
    

export default InputForm;
