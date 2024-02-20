import Toast from 'react-bootstrap/Toast';

function BasicToast({ display, message }) {
    return (
        <Toast show={display}>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">Bootstrap</strong>
                <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>{message && message}</Toast.Body>
        </Toast>
    );
}

export default BasicToast;
