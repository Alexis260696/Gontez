import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup' ;
import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import './formulario.css'
import { axiosInstance } from '../../services/axios.config';

const FormCreateProduct = () => {

    const initialCredentials = {
        medida: '',
        marca: '',
        modelo: '',
        cantidad: ''
    }

    const formSchema = Yup.object().shape({
        medida: Yup.string().min(7, 'nombre demasiado corto').max(20, 'nombre demasiado largo').required('el campo el obligatorio'),
        marca:  Yup.string().min(5, 'descripcion demasiado corta').max(100, 'desciprcion demasiado largo').required('el campo el obligatorio'),
        modelo: Yup.string().max(100, 'desciprcion demasiado largo').required('el campo es obligatorio'),
        cantidad: Yup.number().required('el campo es obligatorio')
    })
    return (
        <div className='container'>
            <Formik 
                initialValues={initialCredentials}
                validationSchema={formSchema}
                onSubmit={(values, {setSubmitting})  => {
                    // same shape as initial values
                    console.log(values);
                    axiosInstance.post('/', values)
                    .then(r => {
                        if (r.status === 201) {
                            console.log(r)
                            setSubmitting(false)
                        }else{
                            throw new Error(`[${r.status}]error en la solicitud`)
                        }
                    })
                    .catch( err => console.log(err))
                    
                }}
            >
                {({values, errors, touched, isSubmitting}) => (
                        <Form>
                            <FormBs.Group className='mb-3'>
                                <label htmlFor='medida'> Medida </label>
                                <Field id='medida' type='text' placeholder='Buzo' name='medida' className='form-control field-input'/>
                                {
                                    errors.medida && touched.medida && (
                                    <ErrorMessage name='medida' component='div'></ErrorMessage>  
                                    )
                                }
                            </FormBs.Group>

                            <FormBs.Group className='mb-3'>
                                <label htmlFor='marca'> Marca  </label>
                                <Field id='marca' type='text' placeholder='Buzo comodo ideal para invierno' name='marca' className='form-control field-input'/>
                                {
                                    errors.marca && touched.marca && (
                                    <ErrorMessage name='marca' component='div'></ErrorMessage>  
                                    )
                                }
                            </FormBs.Group>

                            <FormBs.Group className='mb-3'> 
                                <label htmlFor='modelo'> Modelo </label>
                                <Field id='modelo' type='text'  placeholder='Buzo comodo ideal para invierno' name='modelo' className='form-control field-input'/>
                                {
                                    errors.modelo && touched.modelo && (
                                    <ErrorMessage name='modelo' component='div'></ErrorMessage>  
                                    )
                                }
                            </FormBs.Group>
                            <FormBs.Group className='mb-3'> 
                                <label htmlFor='cantidad'> Cantidad </label>
                                <Field id='cantidad' type='number' placeholder='100' name='cantidad' className='form-control field-input'/>
                                {
                                    errors.cantidad && touched.cantidad && (
                                    <ErrorMessage name='cantidad' component='div'></ErrorMessage>  
                                    )
                                }
                            </FormBs.Group>

                        <Button className='btn btn-primary' type="submit">Cargar producto</Button>
                        {
                            isSubmitting ? (<p>  Enviando producto </p>) : null
                        }
                        </Form>
                    )   
                }

            </Formik>
        </div>
    );
}

export default FormCreateProduct;
