import { capitalize } from "lodash";
import React from "react";
import { Form } from "react-bootstrap";

const RadioInput = ({ inputs, value, setValue, name }) => {
    return (
        <>
            {inputs.map((input, index) => (
                <Form.Check
                    inline
                    id={input}
                    label={capitalize(input)}
                    name={name || `input-${Math.random()}`}
                    type="radio"
                    key={`key-${index * Math.random()}`}
                    checked={value === input ? true : false}
                    onChange={(e) => {
                        if (e.target.checked === true) {
                            setValue(input);
                        }
                    }}
                />
            ))}
        </>
    );
};

export default RadioInput;
