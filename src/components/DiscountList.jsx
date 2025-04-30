import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import discountService from "../services/discount.service";
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

const DiscountList = () => {
  const [discounts, setDiscounts] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    discountService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los descuentos.", response.data);
        setDiscounts(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los descuentos.",
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
      "¿Esta seguro que desea borrar este descuento?"
    );
    if (confirmDelete) {
      discountService
        .remove(id)
        .then((response) => {
          console.log("descuento ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar el descuento.",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/discount/edit/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <br />
      <Link
        to="/discount/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<FormatListNumberedIcon />}
        >
          Añadir descuento
        </Button>
      </Link>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Categoría
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Cantidad Mín. Personas
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Cantidad Máx. Personas
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Frecuencia del cliente
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Tipo Día Especial
            </TableCell>
	    <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Día Especial
            </TableCell>
	    <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Operaciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {discounts.map((discount) => (
            <TableRow
              key={discount.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{discount.category}</TableCell>
              <TableCell align="left">{discount.groupRangeMin}</TableCell>
              <TableCell align="right">{discount.groupRangeMax}</TableCell>
              <TableCell align="right">{discount.freqClientCategory}</TableCell>
              <TableCell align="right">{discount.specialDayType}</TableCell>	
              <TableCell align="right">{discount.specialDay}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => handleEdit(discount.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(discount.id)}
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

export default DiscountList;
