import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { TextField } from "@material-ui/core";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

export default function NumberField() {
  const [value, setValue] = useState();

  const handleChange = (evt) => {
    setValue(evt.target.value);
  };

  return (
    <>
      <TextField
        label="Select Amount"
        value={value}
        onChange={handleChange}
        name="numberformat"
        id="numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    </>
  );
}
