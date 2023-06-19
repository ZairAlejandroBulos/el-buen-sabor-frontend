import { Button, Modal } from "react-bootstrap";

interface Props {
    title: string;
    message: string;
    showModal: boolean;
    handleClose: () => void;
}

/**
 * Componente ventana modal de mensaje Error.
 * @author Castillo
 */
function ModalError({ title, message, showModal, handleClose }: Props): JSX.Element {
    return (
        <Modal show={showModal} onHide={handleClose} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="success">
                    Aceptar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalError;