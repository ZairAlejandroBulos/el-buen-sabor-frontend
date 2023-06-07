import { Alert, Button, Form, Modal } from "react-bootstrap";
import { ArticuloInsumo } from "../../types/ArticuloInsumo";
import { useAuth0 } from "@auth0/auth0-react";
import { useAlert } from "../../hooks/useAlert";
import { useEffect, useState } from "react";
import { ArticuloInsumoStockMinimo } from "../../types/ArticuloInsumoStockMinimo";
import { ArticuloInsumoStockActual } from "../../types/ArticuloInsumoStockActual";
import { UnidadMedida } from "../../types/UnidadMedida";
import { ArticuloInsumoPrecioCompra } from "../../types/ArticuloInsumoPrecioCompra";
import { isValidateNumber, isValidateString } from "../../util/UsuarioUtil";
import { saveArticuloInsumo, updateArticuloInsumo } from "../../services/ArticuloInsumoService";

type Props = {
    showModal: boolean,
    handleClose: () => void,
    articuloInsumo?: ArticuloInsumo
}

/**
 * Componente para crear/actualizar un Artículo Insumo.
 * @author Castillo
 */
function ModalArticuloInsumo({ showModal, handleClose, articuloInsumo }: Props): JSX.Element {
    const [valuesArticuloInsumo, setValuesArticuloInsumo] = useState<ArticuloInsumo>({
        id: 0,
        denominacion: "",
        esInsumo: false,
    });
    const [valuesStockMinimo, setValuesStockMinimo] = useState<ArticuloInsumoStockMinimo>({
        id: 0,
        stockMinimo: 0,
        fecha: "",
    });
    const [valuesStockActual, setValuesStockActual] = useState<ArticuloInsumoStockActual>({
        id: 0,
        stockActual: 0,
        fecha: "",
    });
    const [valuesUnidadMedida, setValuesUnidadMedida] = useState<UnidadMedida[]>([]);
    const [valuesPrecioCosto, setValuesPrecioCosto] = useState<ArticuloInsumoPrecioCompra>({
        id: 0,
        fecha: "",
        monto: 0,
    });

    const [mensajeError, setMensajeError] = useState("");

    const { showAlert, handleAlert } = useAlert();
    const { getAccessTokenSilently } = useAuth0();




    const handleChangeDenominacion = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDenominacion = event.target.value;
        setValuesArticuloInsumo((prevState) => ({
            ...prevState,
            denominacion: newDenominacion
        }));
    };

    const handleChangeStockMinimo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newStockMinimo: number = parseInt(event.target.value);
        setValuesStockMinimo((prevState) => ({
            ...prevState,
            stockMinimo: newStockMinimo
        }));

        if (valuesStockMinimo) {
            setValuesArticuloInsumo((prevState) => ({
                ...prevState,
                articuloInsumoStockMinimo: valuesStockMinimo
            }));
        }
    };

    const handleChangeStockActual = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newStockActual: number = parseInt(event.target.value);
        setValuesStockActual((prevState) => ({
            ...prevState,
            stockActual: newStockActual
        }));

        if (valuesStockActual) {
            setValuesArticuloInsumo((prevState) => ({
                ...prevState,
                articuloInsumoStockActual: valuesStockActual
            }));
        }
    };


    const handleChangeUnidadMedida = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newUnidadMedidaId = Number(event.target.value);
        const selectedUnidadMedida = valuesUnidadMedida.find(item => item.id === newUnidadMedidaId);

        if (selectedUnidadMedida) {
            setValuesArticuloInsumo((prevState) => ({
                ...prevState,
                unidadMedida: selectedUnidadMedida
            }));
        } else {
            setValuesArticuloInsumo((prevState) => ({
                ...prevState,
                unidadMedida: undefined
            }));
        }
    };

    const handleChangePrecioCosto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPrecioCosto: number = parseInt(event.target.value);
        setValuesPrecioCosto((prevState) => ({
            ...prevState,
            monto: newPrecioCosto
        }));

        if (valuesPrecioCosto) {
            setValuesArticuloInsumo((prevState) => ({
                ...prevState,
                articuloInsumoPrecioCompra: valuesPrecioCosto
            }));
        }
    };

    const handleSubmit = async () => {
        const token = await getAccessTokenSilently();
        if (valuesArticuloInsumo?.id === 0) {
            await saveArticuloInsumo(valuesArticuloInsumo, token);
        } else {
            await updateArticuloInsumo(Number(valuesArticuloInsumo?.id), valuesArticuloInsumo, token);
        }
        handleClose();
        window.location.reload();

    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                {articuloInsumo
                    ?
                    <Modal.Title className="text-center">Editar Articulo Insumo</Modal.Title>
                    :
                    <Modal.Title className="text-center">Nuevo Articulo Insumo</Modal.Title>
                }
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="denominacion">Denominación</Form.Label>
                        <Form.Control
                            type="text"
                            id="denominacion"
                            name="denominacion"
                            placeholder="Ingrese denominacion"
                            value={valuesArticuloInsumo?.denominacion || ""}
                            onChange={handleChangeDenominacion}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="stockMinimo">Stock Minimo</Form.Label>
                        <Form.Control
                            type="number"
                            id="stockMinimo"
                            name="stockMinimo"
                            placeholder="Ingrese Stock Minimo"
                            value={valuesStockMinimo?.stockMinimo || ""}
                            onChange={handleChangeStockMinimo}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="stockActual">Stock Actual</Form.Label>
                        <Form.Control
                            type="number"
                            id="stockActual"
                            name="stockActual"
                            placeholder="Ingrese Stock Actual"
                            value={valuesStockActual?.stockActual || ""}
                            onChange={handleChangeStockActual}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="precioCosto">Precio Costo</Form.Label>
                        <Form.Control
                            type="number"
                            id="precioCosto"
                            name="precioCosto"
                            placeholder="Ingrese Precio Costo"
                            value={valuesPrecioCosto?.monto || ""}
                            onChange={handleChangePrecioCosto}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Unidad Medida</Form.Label>
                        <Form.Select id="unidadMedida" value={valuesArticuloInsumo.unidadMedida?.id || -1} onChange={handleChangeUnidadMedida}>
                            <option value="-1">--Seleccione--</option>
                            {
                                valuesUnidadMedida.map((item: UnidadMedida, index: number) =>
                                    <option value={item.id} key={index}>
                                        {item.denominacion}
                                    </option>
                                )
                            }
                        </Form.Select>
                    </Form.Group>
                </Form>
                <Alert show={showAlert} onClick={handleAlert} variant="danger" dismissible>
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>Debe llenar todos los campos</p>
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="danger buttons-modal-form">
                    Cerrar
                </Button>

                <Button onClick={handleSubmit} variant="success">
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ModalArticuloInsumo;