import { Button, Modal } from "react-bootstrap";

interface Props {
    title: string;
    message: string;
    showModal: boolean;
    onOk: () => void;
    onCancel: () => void;
}

function ModalConfirmacion({ title, message, showModal, onOk, onCancel }: Props): JSX.Element {
    return(
        <Modal show={showModal} onHide={onCancel} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    { title }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{ message }</p> 
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onCancel} variant="danger">
                    Cancelar
                </Button>

                <Button onClick={onOk} variant="success">
                    Aceptar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalConfirmacion;