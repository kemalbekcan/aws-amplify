import Form from 'react-bootstrap/Form';
import { post } from 'aws-amplify/api';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { phoneRegExp } from '../utils.js'
import BasicToast from '../components/toast/BasicToast.js';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const validationSchema = Yup.object({
  name: Yup.string().required("Zorunlu alan"),
  surname: Yup.string().required("Zorunlu alan"),
  email: Yup.string().email('Geçersiz e-mail adresi').required('Zorunlu alan'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
});

function AddEmployee() {
  const [showToast, setShowToast] = useState({
    display: false,
    message: ''
  });

  const addEmployee = async (data) => {
    try {
      const restOperation = post({
        apiName: 'myLamAPI',
        path: '/employees',
        options: {
          body: {
            Id: uuidv4(),
            FirstName: data.name,
            LastName: data.surname,
            Email: data.email,
            Phone: data.phone
          }
        }
      });

      await restOperation.response;

      setShowToast({
        display: true,
        message: 'Employee added successfully'

      });

      setTimeout(() => {
        setShowToast({
          display: false,
          message: ''
        });
      }, 3000)
    } catch (e) {
      setShowToast({
        display: true,
        message: 'GET call failed', e
      });

      setTimeout(() => {
        setShowToast({
          display: false,
          message: ''
        });
      }, 3000)
    }
  }
  return (
    <div className="App">
      <div className='container mt-5'>
        <BasicToast display={showToast.display} message={showToast.message} />
        <Formik
          initialValues={{ name: '', surname: '', email: '', phone: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            addEmployee(values);
            resetForm();
          }}
        >
          {({
            handleSubmit, handleChange, handleReset, values, errors
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  placeholder="John" />
              </Form.Group>
              <p>{errors.name && errors.name}</p>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text"
                  name="surname"
                  onChange={handleChange}
                  value={values.surname}
                  placeholder="Doe" />
              </Form.Group>
              <p>{errors.surname && errors.surname}</p>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  placeholder="name@example.com" />
              </Form.Group>
              <p>{errors.email && errors.email}</p>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text"
                  name="phone"
                  onChange={handleChange}
                  value={values.phone}
                  placeholder='Phone' />
              </Form.Group>
              <p>{errors.phone && errors.phone}</p>
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddEmployee;
