import React, { useState } from 'react';
export default function CodeInput(props) {
  const { value, onChange, placeholder, type } = props;
  const [code, setCode] = useState(value);
  return (
    <div className="input-box code-box">
      <input
        className="custom-input"
        type={type || 'number'}
        maxLength="6"
        value={code}
        autoFocus
        onChange={(e) => {
          const nextCode = e.target.value.slice(0, 6);
          setCode(nextCode);
          onChange && onChange(nextCode);
        }}
      />
      <div className="split-line"></div>
      <div className="tip">{placeholder || ''}</div>
    </div>
  );
}
