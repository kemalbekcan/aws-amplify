import { useState, useEffect } from 'react';
import BasicModal from '../components/modals/BasicModal';
import BasicTable from '../components/tables/BasicTable';
import { get, put, del } from 'aws-amplify/api';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigation = useNavigate();
    const { authStatus } = useAuthenticator(context => [context.authStatus]);
    const [employees, setEmployees] = useState([]);
    const [show, setShow] = useState(false);
    const [method, setMethod] = useState('update');

    useEffect(() => {
        if (authStatus === 'unauthenticated') {
            navigation('/');
        }
    })

    const [formData, setFormData] = useState({
        Id: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: ''
    })

    const modalOpen = (data, methodName) => {
        setShow(true);
        if (data) {
            setMethod(methodName)
            setFormData(data);
        }
    }

    const getEmployees = async () => {
        try {
            const restOperation = get({
                apiName: 'myLamAPI',
                path: '/employees'
            });

            const { body } = await restOperation.response;
            const response = await body.json();
            setEmployees(response)
        } catch (e) {
            console.error('GET call failed', e);
        }
    }

    const updateEmployee = async (data) => {
        try {
            const restOperation = put({
                apiName: 'myLamAPI',
                path: `/employees`,
                options: {
                    body: {
                        Id: formData.Id,
                        FirstName: formData.FirstName,
                        LastName: formData.LastName,
                        Email: formData.Email,
                        Phone: formData.Phone
                    }
                }
            });

            await restOperation.response;
            getEmployees();
            setShow(false);
        } catch (e) {
            console.error('GET call failed', e);
        }
    }

    const removeEmployee = async (data) => {
        try {
            const restOperation = del({
                apiName: 'myLamAPI',
                path: `/employees/object/${data.Id}`,
            });

            await restOperation.response;
            getEmployees();
            setShow(false);
        } catch (e) {
            console.error('GET call failed', e);
        }
    }

    const setEmployeeData = (data) => {
        setFormData(data);
    }

    useEffect(() => {
        getEmployees()
    }, [])

    return (
        <>
            <BasicModal 
            show={show} 
            method={method} 
            setEmployeeData={setEmployeeData} 
            setShow={setShow} 
            setFormData={setFormData} 
            data={formData} updateEmployee={() => updateEmployee()} 
            removeEmployee={() => removeEmployee(formData)} />
            <div className="App">
                <header className="App-header">
                    <div className='container mt-5'>
                        <h2>My Employees</h2>
                        <BasicTable
                            head={['#', 'First Name', 'Last Name', 'Email', 'Phone', 'Update', 'Delete']}
                            data={employees}
                            modalOpen={modalOpen}
                        />
                    </div>
                </header>
            </div>
        </>
    );
}

export default Home;
