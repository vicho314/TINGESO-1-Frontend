import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import feeTypeService from "../services/feeType.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const FeeTypeList = () => {
  const [feeTypes, setFeeTypes] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    feeTypeService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todas las tarifas.", response.data);
        setFeeTypes(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todas las tarifas.",
          error
        );
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm(
      "¿Esta seguro que desea borrar esta tarifa"
    );
    if (confirmDelete) {
      feeTypeService
        .remove(id)
        .then((response) => {
          console.log("tarifa ha sido eliminada.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar a la tarifa",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/feeType/edit/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <br />
      <Link
        to="/feeType/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<FormatListNumberedIcon />}
        >
          Crear tarifa
        </Button>
      </Link>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Vueltas
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Dur.Máxima
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Costo
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Tiempo Total
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Operaciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feeTypes.map((feeType) => (
            <TableRow
              key={feeType.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{feeType.laps}</TableCell>
              <TableCell align="left">{feeType.lapsTime}</TableCell>
              <TableCell align="right">{feeType.cost}</TableCell>
              <TableCell align="right">{feeType.totalTime}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => handleEdit(feeType.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(feeType.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<DeleteIcon />}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FeeTypeList;
