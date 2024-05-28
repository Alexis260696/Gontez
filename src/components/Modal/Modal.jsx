import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup' ;
import Button from 'react-bootstrap/Button';
import ModalBs from 'react-bootstrap/Modal';
import FormBs from 'react-bootstrap/Form';
import { ItemsContext, UPLOAD_ITEMS } from '../../context/itemsContext';
import { axiosInstance } from '../../services/axios.config';


const Modal = (props) => {

    const {items, dispatch} = useContext(ItemsContext)

    const initialCredentials = {
        medida: props.item.medida || '',
        marca: props.item.marca || '',
        modelo: props.item.modelo || '',
        cantidad: props.item.cantidad || ''
    }

    const formSchema = Yup.object().shape({
        medida: Yup.string().min(4, 'nombre demasiado corto').max(20, 'nombre demasiado largo').required('el campo el obligatorio'),
        marca:  Yup.string().min(3, 'descripcion demasiado corta').max(20, 'desciprcion demasiado largo').required('el campo el obligatorio'),
        modelo: Yup.string().required('el campo es obligatorio'),
        cantidad: Yup.number().required('el campo es obligatorio')
    })


    return (
        <ModalBs
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalBs.Header closeButton className='bg-dark'>
                <ModalBs.Title id="contained-modal-title-vcenter">
                    Editando Producto
                </ModalBs.Title>
            </ModalBs.Header>
            <ModalBs.Body className='bg-dark'>
            <Formik 
                initialValues={initialCredentials}
                validationSchema={formSchema}
                onSubmit={ async (values, {setSubmitting})  => {
                    // same shape as initial values
                    console.log(values);
                   // await props.onSubmit(props.item.id, values)
                    axiosInstance.put(`/${props.item.id}`, values)
                        .then(r => {
                            if (r.status === 200) {
                               const itemsUpload = items.map(item => {
                                if (item.id === r.data.id) {
                                    return r.data
                                }
                                return item
                            })
                            dispatch({type:UPLOAD_ITEMS, payload: itemsUpload})
                            setSubmitting(false) 

                            } else {
                                throw new Error(`[ERROR ${r.status}] error en la solicitud`)
                            }
                            
                        })
                        .catch(err => console.log(err))
                        props.onHide()
                }}
            >
                {({values, errors, touched, isSubmitting, handleChange}) => (
                        <Form>
                            <FormBs.Group className='mb-3'>
                                <label htmlFor='medida'> Medida </label>
                                <Field id='medida' type='text' placeholder='Buzo' name='medida' className='form-control field-input' onChange={handleChange}/>
                                {
                                    errors.medida && touched.medida && (
                                    <ErrorMessage name='medida' component='div'></ErrorMessage>  
                                    )
                                }
                            </FormBs.Group>

                            <FormBs.Group className='mb-3'>
                                <label htmlFor='marca'> Marca  </label>
                                <Field id='marca' type='text' placeholder='Buzo comodo ideal para invierno' name='marca' className='form-control field-input' onChange={handleChange}/>
                                {
                                    errors.marca && touched.marca && (
                                    <ErrorMessage name='marca' component='div'></ErrorMessage>  
                                    )
                                }
                            </FormBs.Group>

                            <FormBs.Group className='mb-3'> 
                                <label htmlFor='modelo'> Modelo </label>
                                <Field id='modelo' type='text' placeholder='Buzo comodo ideal para invierno' name='modelo' className='form-control field-input' onChange={handleChange}/>
                                {
                                    errors.modelo && touched.modelo && (
                                    <ErrorMessage name='modelo' component='div'></ErrorMessage>  
                                    )
                                }
                            </FormBs.Group>
                            <FormBs.Group className='mb-3'> 
                                <label htmlFor='cantidad'> Cantidad </label>
                                <Field id='cantidad' type='number' placeholder='8000' name='cantidad' className='form-control field-input' onChange={handleChange}/>
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
            </ModalBs.Body>
            <ModalBs.Footer className='bg-dark'>
                <Button onClick={props.onHide}>Close</Button>
            </ModalBs.Footer>
        </ModalBs>
    );
}

export default Modal;
