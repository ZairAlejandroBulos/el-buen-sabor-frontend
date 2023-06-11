import { Alert, Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { saveArticuloManufacturado, updateArticuloManufacturado } from "../../services/ArticuloManufacturadoService";
import { useAuth0 } from "@auth0/auth0-react";
import { findAllRubro } from "../../services/RubroService";
import { useAlert } from "../../hooks/useAlert";

interface Rubro {
    id: number;
    denominacion: string;
}

interface ArticuloManufacturado {
    id: number;
    denominacion: string;
    descripcion: string;
    imagen: string;
    precioVenta: number;
    tiempoEstimadoCocina?: string;
    rubro?: Rubro;
}

function AMArticuloManufacturado(): JSX.Element {
    const { id } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const [rubros, setRubros] = useState<Rubro[]>([]);
    const [messageError, setMessageError] = useState<string>("");
    const { showAlert, handleAlert } = useAlert();
    const [articuloManufacturado, setArticuloManufacturado] = useState<ArticuloManufacturado>({
        id: 0,
        denominacion: '',
        descripcion: '',
        imagen: '',
        tiempoEstimadoCocina: '',
        precioVenta: 0,
    });

    useEffect(() => {
        getRubros();
    }, []);

    const getRubros = async () => {
        const token = await getAccessTokenSilently();

        const newRubrosPadres: Rubro[] = await findAllRubro(token);
        setRubros(newRubrosPadres);
    };

    const handleChangeDenominacion = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDenominacion = event.target.value;
        setArticuloManufacturado((prevState) => ({
            ...prevState,
            denominacion: newDenominacion
        }));
    };

    const handleChangeRubro = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const rubroId = parseInt(event.target.value);
        const selectedRubro = rubros.find((rubro) => rubro.id === rubroId);
        setArticuloManufacturado((prevState) => ({
            ...prevState,
            rubro: selectedRubro,
        }));
    };

    const handleChangeTiempoCocina = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTiempoCocina = event.target.value;
        setArticuloManufacturado((prevState) => ({
            ...prevState,
            tiempoCocina: newTiempoCocina
        }));
    };

    const handleChangePrecioVenta = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPrecioVenta = Number(event.target.value);
        setArticuloManufacturado((prevState) => ({
            ...prevState,
            precioVenta: newPrecioVenta
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!articuloManufacturado.denominacion) {
            const token = await getAccessTokenSilently();

            if (Number(id) === -1) {
                await saveArticuloManufacturado(articuloManufacturado, token);
            } else {
                await updateArticuloManufacturado(Number(id), articuloManufacturado, token);
            }
        }
    };

    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="nombre"
                            defaultValue={articuloManufacturado?.denominacion}
                            onChange={handleChangeDenominacion}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Rubro</Form.Label>
                        <Form.Select id="rubro" value={articuloManufacturado.rubro?.id || -1} onChange={handleChangeRubro}>
                            <option value="-1">--Seleccione--</option>
                            {
                                rubros.map((item: Rubro, index: number) =>
                                    <option value={item.id} key={index}>
                                        {item.denominacion}
                                    </option>
                                )
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Imagen</Form.Label>
                        <Form.Control
                            type="file"
                        //onChange={""}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tiempo Cocina</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="tiempoCocina"
                            defaultValue={articuloManufacturado?.tiempoEstimadoCocina}
                            onChange={handleChangeTiempoCocina}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Precio de Venta</Form.Label>
                        <Form.Control
                            type="number"
                            min={0}
                            defaultValue={articuloManufacturado?.precioVenta}
                            onChange={handleChangePrecioVenta}
                        />
                    </Form.Group>

                    <Button variant="danger">
                        Cancelar
                    </Button>
                    <Button type="submit" variant="success">
                        Guardar
                    </Button>
                </Form>
                <Alert show={showAlert} onClick={handleAlert} dismissible variant="danger" className="mt-3">
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>{messageError}</p>
                </Alert>
            </Container>

        </>
    );
}

export default AMArticuloManufacturado;