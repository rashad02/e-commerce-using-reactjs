import React from 'react'

import "./toggle-button.styles.scss";


const ToggleSwitch = ({ isOn, onChange, onColor, onText,offText }) => {
  return (
    <div>
        <label className="switch">
            <input type="checkbox"   checked={isOn} id={`react-switch-new`}
                onChange={onChange} className="switch-input" />
                {/* <i class="icon-play"></i>/> */}
            <span className="switch-label" style={isOn ? {'background': onColor, 'fontSize': "25px"} : {'fontSize': "25px"}} data-on={onText} data-off={offText}></span>
            <span className="switch-handle"></span>
        </label>
    </div>
  );
};

export default ToggleSwitch;