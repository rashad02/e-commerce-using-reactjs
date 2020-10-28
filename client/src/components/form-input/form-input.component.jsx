import React from 'react';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./form-input.styles.scss";

const FormInput = ({handleChange, label,type,value, ...otherProps}) => {

    return (
        <div className="group">
            {type === 'date' ?  <div className="date-picker">
                        <DatePicker selected={value} onCalendarOpen= {()=> otherProps.isCalenderOpen = true} onChange={date => handleChange({target:{value: date, name:otherProps.name}})}/>
                        {
                            label ? (<label className ={`${ value ? 'shrink': ''} form-input-label `}>{label}
                            </label>) : null
                         }
                    </div> : 
                    <div><input type={type} className="form-input" value={value} onChange={handleChange} {...otherProps} />
                {
                label ? (<label className ={`${value ? 'shrink': ''} form-input-label `}>{label}
                </label>) : null
                }</div>}
            
        </div>
    )
}

export default FormInput;