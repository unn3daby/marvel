import React, { useEffect, useState } from 'react';
import './CharFinder.scss';
import { Formik, Form } from 'formik';
import useMarvelService from '../../services/marvelService';
import * as Yup from 'yup'
const CharFinder = () => {
    const [char, setChar] = useState({});

    const {findChar} = useMarvelService();

    const handleSubmit = (e, name) => {
        e.preventDefault();
        findChar(name)
            .then((res) => {
                setChar(res)
            })
    }

    console.log(char);
    
    return (
        <div>
            <Formik 
                initialValues={{ name: '' }} 
                validationSchema={Yup.object({
                    name: Yup.string()
                    .required('This field is required')
                })}
                onSubmit={(e, values) => handleSubmit(e, values.name)}
            >
                {formik => 
                    <Form className = "char__finder" onSubmit={(e) => handleSubmit(e, formik.values.name)}>
                        <label className = "char__finder-label" htmlFor="firstName">Or find a character by name:</label>
                            <input className='char__field'
                                id="name"
                                type="text"
                                placeholder='Enter name'
                                {...formik.getFieldProps('name')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                    <div>{formik.errors.email}</div>
                                ) : null}
                            <button disabled = {formik.values.name === ''? true : false} className="button button__main">
                                <div className="inner">Find</div>
                            </button>
                            {formik.touched.name && formik.errors.name ? (
                            <div className='error'>{formik.errors.name}</div> 
                        ) : null}
                    </Form>}
            </Formik>
        </div>
    );
};

export default CharFinder;