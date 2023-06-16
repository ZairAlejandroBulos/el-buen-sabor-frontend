import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { ArticuloInsumo } from "../../types/ArticuloInsumo";
import { useEffect, useState } from "react";
import { useAlert } from "../../hooks/useAlert";
import { isArticuloInsumo } from "../../util/ArticuloInsumoUtil";
import { Rubro } from "../../types/Rubro";
import { findAllRubro, findRubroById } from "../../services/RubroService";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { findArticuloInsumoFullById, saveArticuloInsumo, updateArticuloInsumo } from "../../services/ArticuloInsumoService";
import { UnidadMedida } from "../../types/UnidadMedida";
import { findAllUnidadMedida, findUnidadMedidaById } from "../../services/UnidadMedidaService";

function AMArticuloInsumo(): JSX.Element {
    const { id } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const [values, setValues] = useState<ArticuloInsumo>({
        "id": 0,
        "denominacion": "",
        "esInsumo": false,
        "unidadMedida": {
            "id": 0,
            "denominacion": ""
        },
        "precioCompra": 0,
        "stockMinimo": 0,
        "stockActual": 0,
        "rubro": {
            "id": 0,
            "denominacion": ""
        }
    })
    const [unidadMedida, setUnidadMedida] = useState<UnidadMedida[]>([]);
    const [rubros, setRubros] = useState<Rubro[]>([]);
    const { showAlert, handleAlert } = useAlert();

    useEffect(() => {
        getAllRubro();
        getAllUnidadMedida();
    }, [])

    useEffect(() => {
        getArticuloInsumo();
    }, [id]);

    const getArticuloInsumo = async () => {
        const token = await getAccessTokenSilently();
        if (id !== "-1") {
            const newArticuloInsumo: ArticuloInsumo = await findArticuloInsumoFullById(Number(id), token);
            console.log(newArticuloInsumo);
            setValues(newArticuloInsumo);
        }
    }

    const getAllRubro = async () => {
        const token = await getAccessTokenSilently();

        const newRubros = await findAllRubro(token);
        setRubros(newRubros);
    };

    const getAllUnidadMedida = async () => {
        const token = await getAccessTokenSilently();

        const newUnidadMedida = await findAllUnidadMedida(token);
        setUnidadMedida(newUnidadMedida);
    };


    const getRubroById = async (id: number) => {
        const token = await getAccessTokenSilently();

        return await findRubroById(id, token);
    }

    const getUnidadMedidaById = async (id: number) => {
        const token = await getAccessTokenSilently();

        return await findUnidadMedidaById(id, token);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeInsumo = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const insumoSelected = Number(event.currentTarget.value);
        setValues((prevState) => ({
            ...prevState,
            esInsumo: insumoSelected === 0 ? false : true
        }));
    }

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

    const handleChangeUnidadMedida = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const unidadMedidaSelected = Number(event.currentTarget.value);
        if (unidadMedidaSelected !== -1) {
            const newUnidadMedida = await getUnidadMedidaById(unidadMedidaSelected);
            setValues((prevState) => ({
                ...prevState,
                unidadMedida: newUnidadMedida
            }));
        }
    };

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isArticuloInsumo(values)) {
            const token = await getAccessTokenSilently();

            if (values.id === 0) {
                await saveArticuloInsumo(values, token);
            } else {
                await updateArticuloInsumo(values.id, values, token);
            }

            window.location.href = "/admin/stock/articulos-insumos";
        } else {
            handleAlert();
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="denominacion">Denominación</Form.Label>
                    <Form.Control
                        type="text"
                        id="denominacion"
                        name="denominacion"
                        placeholder="Ingrese denominacion"
                        value={values?.denominacion}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="stockMinimo">Stock Minimo</Form.Label>
                    <Form.Control
                        type="number"
                        id="stockMinimo"
                        name="stockMinimo"
                        placeholder="Ingrese Stock Minimo"
                        value={values?.stockMinimo}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="stockActual">Stock Actual</Form.Label>
                    <Form.Control
                        type="number"
                        id="stockActual"
                        name="stockActual"
                        placeholder="Ingrese Stock Actual"
                        value={values?.stockActual}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="precioCompra">Precio Costo</Form.Label>
                    <Form.Control
                        type="number"
                        id="precioCompra"
                        name="precioCompra"
                        placeholder="Ingrese Precio Costo"
                        value={values?.precioCompra}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="esInsumo">Es Insumo</Form.Label>
                    <Form.Select name="esInsumo" value={values.esInsumo ? 1 : 0} onChange={handleChangeInsumo}>
                        <option value="0">No</option>
                        <option value="1">Si</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Rubro</Form.Label>
                    <Form.Select id="rubro" name="rubro" value={values.rubro?.id || -1} onChange={handleChangeRubro}>
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
                    <Form.Label>Unidad Medida</Form.Label>
                    <Form.Select id="unidadMedida" name="unidadMedida" value={values.unidadMedida?.id || -1} onChange={handleChangeUnidadMedida}>
                        <option value="-1">--Seleccione--</option>
                        {
                            unidadMedida.map((item: UnidadMedida, index: number) =>
                                <option value={item.id} key={index}>
                                    {item.denominacion}
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

            <Alert show={showAlert} onClick={handleAlert} variant="danger" dismissible>
                <Alert.Heading>Error!</Alert.Heading>
                <p>Debe llenar todos los campos</p>
            </Alert>
        </Container>
    );
}
export default AMArticuloInsumo;