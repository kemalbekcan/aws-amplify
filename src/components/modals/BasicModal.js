import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function BasicModal({ show, setShow, method, data, setEmployeeData, setFormData, updateEmployee, removeEmployee }) {
    const handleClose = () => setShow(false);

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Employee Delete</Modal.Title>
                </Modal.Header>
                {method === 'update' ? (
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="firstName" value={data.LastName} onChange={(e) => setEmployeeData({ ...data, LastName: e.target.value })} placeholder="Jordan" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" value={data.Email} onChange={(e) => setEmployeeData({ ...data, Email: e.target.value })} placeholder="name@example.com" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" value={data.Phone} onChange={(e) => setEmployeeData({ ...data, Phone: e.target.value })} placeholder="name@example.com" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                ) : (
                    <Modal.Body>Çalışanları silmek istediğinize emin misin!</Modal.Body>
                )}

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {method === 'update' ? (
                        <Button variant="primary" onClick={updateEmployee}>
                            Update
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={removeEmployee}>
                            Delete
                        </Button>
                    )}

                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default BasicModal;
