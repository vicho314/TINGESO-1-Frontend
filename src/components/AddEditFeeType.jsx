import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import feeTypeService from "../services/feeType.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";

const AddEditFeeType = () => {
  const [laps, setLaps] = useState("");
  const [lapsTime, setLapsTime] = useState("");
  const [cost, setCost] = useState("");
  const [totalTime, setTotalTime] = useState("");
  //const [category, setCategory] = useState("");
  const { id } = useParams();
  const [titleFeeTypeForm, setTitleFeeTypeForm] = useState("");
  const navigate = useNavigate();

  const saveFeeType = (e) => {
    e.preventDefault();

    const feeType = { laps, lapsTime, cost, totalTime, id };
    if (id) {
      //Actualizar Datos Empelado
      feeTypeService
        .update(feeType)
        .then((response) => {
          console.log("Tarifa ha sida actualizada.", response.data);
          navigate("/feeType/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar actualizar datos de la tarifa.",
            error
          );
        });
    } else {
      //Crear nuevo empleado
      feeTypeService
        .create(feeType)
        .then((response) => {
          console.log("Tarifa ha sido añadida.", response.data);
          navigate("/feeType/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar crear nueva tarifa.",
            error
          );
        });
    }
  };

  useEffect(() => {
    if (id) {
      setTitleFeeTypeForm("Editar Tarifa");
      feeTypeService
        .get(id)
        .then((feeType) => {
          setLaps(feeType.data.laps);
          setLapsTime(feeType.data.lapsTime);
          setCost(feeType.data.cost);
          setTotalTime(feeType.data.totalTime);
          //setCategory(feeType.data.category);
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleFeeTypeForm("Nueva Tarifa");
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
    >
      <h3> {titleFeeTypeForm} </h3>
      <hr />
      <form>
        <FormControl fullWidth>
          <TextField
            id="rut"
            label="Rut"
            value={rut}
            variant="standard"
            onChange={(e) => setRut(e.target.value)}
            helperText="Ej. 12.587.698-8"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="name"
            label="Name"
            value={name}
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="salary"
            label="Salary"
            type="number"
            value={salary}
            variant="standard"
            onChange={(e) => setSalary(e.target.value)}
            helperText="Salario mensual en Pesos Chilenos"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="children"
            label="Children"
            type="number"
            value={children}
            variant="standard"
            onChange={(e) => setChildren(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="category"
            label="Category"
            value={category}
            select
            variant="standard"
            defaultValue="A"
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "25%" }}
          >
            <MenuItem value={"A"}>A</MenuItem>
            <MenuItem value={"B"}>B</MenuItem>
            <MenuItem value={"C"}>C</MenuItem>
          </TextField>
        </FormControl>

        <FormControl>
          <br />
          <Button
            variant="contained"
            color="info"
            onClick={(e) => saveFeeType(e)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<SaveIcon />}
          >
            Grabar
          </Button>
        </FormControl>
      </form>
      <hr />
      <Link to="/feeType/list">Back to List</Link>
    </Box>
  );
};

export default AddEditFeeType;
