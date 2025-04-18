import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";

// ----------------------------------------------------------------------

export function TablePaginationCustom({
  sx,

  onChangeDense,
  rowsPerPageOptions = [5, 10, 25],
  ...other
}) {
  return (
    <Box sx={[{ position: "relative" }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        {...other}
        sx={{ borderTopColor: "transparent" }}
      />
    </Box>
  );
}
