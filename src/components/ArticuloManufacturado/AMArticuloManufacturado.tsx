import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Button, Container, Form } from "react-bootstrap";

import { Rubro } from "../../types/Rubro";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import { useAlert } from "../../hooks/useAlert";
import { findAllRubro, findRubroById } from "../../services/RubroService";
import { findArticuloManufacturadoFullById, saveArticuloManufacturado, updateArticuloManufacturado } from "../../services/ArticuloManufacturadoService";
import { generateImageName } from "../../util/ImagenUtil";
import { isArticuloManufacturado } from "../../util/ArticuloManufacturadoUtil";
import { isImagen } from "../../util/ImagenUtil";

/**
 * Componente para crear/actualizar un ArticuloManufacturado.
 * @author Castillo, Bulos 
 */
function AMArticuloManufacturado(): JSX.Element {
    const { id } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const [values, setValues] = useState<ArticuloManufacturado>({
        "id": 0,
        "denominacion": "",
        "descripcion": "",
        "imagen": "",
        "precioVenta": 0,
        "tiempoEstimadoCocina": "",
        "rubro": {
            "id": 0,
            "denominacion": ""
        }
    });
    const [rubros, setRubros] = useState<Rubro[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const { showAlert, handleAlert } = useAlert();

    useEffect(() => {
        getAllRubro();
    }, []);

    useEffect(() => {
        getArticuloManufacturado();
    }, [id]);

    const getArticuloManufacturado = async () => {
        if (id !== "-1") {
            const token = await getAccessTokenSilently();

            const newArticuloManufacturado = await findArticuloManufacturadoFullById(Number(id), token);
            setValues(newArticuloManufacturado);
        }
    };

    const getAllRubro = async () => {
        const token = await getAccessTokenSilently();

        const newRubros = await findAllRubro(token);
        setRubros(newRubros);
    };

    const getRubroById = async (id: number) => {
        const token = await getAccessTokenSilently();

        return await findRubroById(id, token);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeRubro = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const rubroSelected = Number(event.currentTarget.value);
        if (rubroSelected !== -1) {
            const newRubro = await getRubroById(rubroSelected);
            setValues((prevState) => ({
                ...prevState,
                rubro: newRubro
            }));
        }
    };

    const handleChangeImagen = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          const file = event.target.files[0];
          const imagen = generateImageName(file.name);
          setFile(file);
          setValues((prevState) => ({
            ...prevState,
            imagen: imagen
          }));
        }
    };

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (file !== null && isImagen(file) && isArticuloManufacturado(values)) {
            const token = await getAccessTokenSilently();

            if (values.id === 0) {
                await saveArticuloManufacturado(values, file, token);
            } else {
                // TODO: Implementar update
                // await updateArticuloManufacturado(values.id, values, file, token);
            }

            window.location.href = "/admin/stock/articulos-manufacturados";
        } else {
            handleAlert();
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Denominación</Form.Label>
                    <Form.Control
                        type="text"
                        name="denominacion"
                        placeholder="Denominación"
                        defaultValue={values?.denominacion}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        type="text"
                        name="descripcion"
                        placeholder="Descripción"
                        defaultValue={values?.descripcion}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tiempo Estimado Cocina</Form.Label>
                    <Form.Control
                        type="text"
                        name="tiempoEstimadoCocina"
                        placeholder="Tiempo Estimado Cocina"
                        defaultValue={values?.tiempoEstimadoCocina}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Precio de venta</Form.Label>
                    <Form.Control
                        type="number"
                        name="precioVenta"
                        placeholder="Precio de venta"
                        value={values?.precioVenta}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control
                        type="file"
                        name="imagen"
                        onChange={handleChangeImagen}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                        <Form.Label>Rubro</Form.Label>
                        <Form.Select id="rubro" value={values?.rubro?.id || -1} onChange={handleChangeRubro}>
                            <option value="-1">--Seleccione--</option>
                            {
                                rubros.map((item: Rubro, index: number) =>
                                    <option key={index} value={item.id}>
                                        { item.denominacion }
                                    </option>
                                )
                            }
                        </Form.Select>
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
                <p>Campos vacios y/o incorrectos.</p>
            </Alert>
        </Container>
    );
}

export default AMArticuloManufacturado;