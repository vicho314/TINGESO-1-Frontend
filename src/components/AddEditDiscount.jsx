import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import discountService from "../services/discount.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
//import {DateField} from '@mui/x-date-pickers/DateField';
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";

const AddEditDiscount = () => {
  const [category, setCategory] = useState("");
  const [groupRangeMin, setGroupRangeMin] = useState("");
  const [groupRangeMax, setGroupRangeMax] = useState("");
  const [freqClientCategory, setFreqClientCategory] = useState("");
  //const [totalTime, setTotalTime] = useState("");
  const [specialDayType, setSpecialDayType] = useState("");
  const [specialDay, setSpecialDay] = useState("");
  //const [atBirthDay, setAtBirthDay] = useState("");
  const [percent, setPercent] = useState("");
  //JsonIgnore!!
  const [discountTransactionList, setDiscountTransactionList] = useState("");
  //const [category, setCategory] = useState("");
  const { id } = useParams();
  const [titleDiscountForm, setTitleDiscountForm] = useState("");
  const navigate = useNavigate();

  const saveDiscount = (e) => {
    e.preventDefault();
	  console.log(e);

    const discount = { category, groupRangeMin, groupRangeMax, 
	    freqClientCategory, specialDayType,specialDay, percent,
	    discountTransactionList,
	    id };
    if (id) {
      //Actualizar Datos Empelado
      discountService
        .update(discount)
        .then((response) => {
          console.log("Descuento ha sido actualizado.", response.data);
          navigate("/discount/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar actualizar datos del descuento.",
            error
          );
        });
    } else {
      //Crear nuevo empleado
      discountService
        .create(discount)
        .then((response) => {
          console.log("Descuento ha sido añadido.", response.data);
          navigate("/discount/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar crear nuevo descuento.",
            error
          );
        });
    }
  };
/*
 const discount = { category, groupRangeMin, groupRangeMax, 
	    freqClientCategory,totalTime, specialDayType,specialDay,
	    atBirthDay, id };*/
  useEffect(() => {
    if (id) {
      setTitleDiscountForm("Editar descuento");
      discountService
        .get(id)
        .then((discount) => {
          setCategory(discount.data.category);
	  setPercent(discount.data.percent);
          setGroupRangeMin(discount.data.groupRangeMin);
          setGroupRangeMax(discount.data.groupRangeMax);
	  setFreqClientCategory(discount.data.freqClientCategory);
          //setTotalTime(discount.data.totalTime);
	  setSpecialDayType(discount.data.specialDayType);
	  setSpecialDay(discount.data.specialDay);
	  //setDiscountTransactionList(discount.data.discountTransactionList);
	  setDiscountTransactionList(null);
	  //setAtBirthDay(discount.data.atBirthDay);
          //setCategory(discount.data.category);
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleDiscountForm("Nuevo Descuento");
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
      <h3> {titleDiscountForm} </h3>
      <hr />
      <form>
        <FormControl fullWidth>
          <TextField
            id="category"
            label="Categoría"
            value={category}
            variant="standard"
            onChange={(e) => setCategory(e.target.value)}
            helperText="Ej. Especial"
          />
        </FormControl>

	  <FormControl fullWidth>
          <TextField
            id="groupRangeMin"
            label="Mín. Personas"
            value={groupRangeMin}
	    type="number"
            variant="standard"
            onChange={(e) => setGroupRangeMin(e.target.value)}
            helperText="Ej. 2"
          />
        </FormControl>
	
	<FormControl fullWidth>
          <TextField
            id="groupRangeMax"
            label="Máx. Personas"
            value={groupRangeMax}
	    type="number"
            variant="standard"
            onChange={(e) => setGroupRangeMax(e.target.value)}
            helperText="Ej. 5"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="freqClientCategory"
            label="Categ. Frecuencia"
            value={freqClientCategory}
            variant="standard"
            onChange={(e) => setFreqClientCategory(e.target.value)}
	    style={{ width: "35%" }}
          >
            <MenuItem value={"MF"}>Muy Frecuente</MenuItem>
            <MenuItem value={"F"}>Frecuente</MenuItem>
            <MenuItem value={"R"}>Regular</MenuItem> 
            <MenuItem value={"PF"}>Poco Frecuente</MenuItem>
	  </TextField>
        </FormControl>
	
	<FormControl fullWidth>
          <TextField
            id="specialDayType"
            label="Tipo Día Especial"
            value={specialDayType}
            variant="standard"
            onChange={(e) => setSpecialDayType(e.target.value)}
	    style={{ width: "35%" }}
          >
            <MenuItem value={"Birth"}>Cumpleaños</MenuItem>
            <MenuItem value={"Feriado"}>Feriado o Festivo</MenuItem>
            <MenuItem value={"Finde"}>Fin de Semana</MenuItem> 
            <MenuItem value={"Otro"}>Otro</MenuItem>
	  </TextField>
        </FormControl>
	
	<FormControl fullWidth>
          <TextField
            id="specialDay"
            label="Día Especial"
            value={specialDay}
            variant="standard"
            onChange={(e) => setSpecialDay(e.target.value)}
            helperText="Ej. DD/MM/YYYY"
          />
        </FormControl>


	<FormControl fullWidth>
          <TextField
            id="percent"
            label="Percent"
            value={percent}
	    type="number"
            variant="standard"
            onChange={(e) => setPercent(e.target.value)}
            helperText="Ej. 20,50"
          />
        </FormControl>	

        <FormControl>
          <br />
          <Button
            variant="contained"
            color="info"
            onClick={(e) => saveDiscount(e)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<SaveIcon />}
          >
            Grabar
          </Button>
        </FormControl>
      </form>
      <hr />
      <Link to="/discount/list">Back to List</Link>
    </Box>
  );
};

export default AddEditDiscount;
