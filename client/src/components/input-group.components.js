import React from "react";

export const InputGroup = ({ span, type, handleChangeForm, employee, placeholder, name, arialabel }) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        {span}
      </span>
      <input
        type= {type}
        onChange={handleChangeForm}
        className="form-control"
        value={employee}
        placeholder={placeholder}
        name={name}
        aria-label={arialabel}
      />
    </div>
  );
};
