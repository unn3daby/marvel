import React from 'react';
import { useField } from 'formik';
const CustomField = ({label, ...props}) => {
    const [field, meta] = useField(props);
    
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error?(<div className='error'>{meta.error}</div>):null}
        </>
    );
};

export default CustomField;