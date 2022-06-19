import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { red, yellow } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import TablePaginationActions from '../../../components/TablePaginationActions';

function TableCategory({ categories, onClickEditIcon, onClickDeleteIcon }) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const categoriesArr = useMemo(
    () => Object.keys(categories).map((key) => categories[key].name),
    [categories]
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categoriesArr.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer>
      <Table sx={{ width: 500, maxWidth: '80vw' }}>
        <TableBody>
          {(rowsPerPage > 0
            ? categoriesArr.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : categoriesArr
          ).map((key) => {
            const { name: categoryName } = categories[key];

            return (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  <Typography>{categoryName}</Typography>
                </TableCell>

                <TableCell style={{ width: 160 }} align="right">
                  <Tooltip title="Edit" arrow>
                    <IconButton
                      onClick={() => onClickEditIcon(categoryName)}
                      sx={{ color: yellow[800] }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete" arrow>
                    <IconButton
                      onClick={() => onClickDeleteIcon(categoryName)}
                      sx={{ color: red[700] }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={3}
              count={categoriesArr.length}
              rowsPerPage={rowsPerPage}
              page={page}
              rowsPerPageOptions={[]}
              onPageChange={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

TableCategory.propTypes = {
  categories: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClickEditIcon: PropTypes.func.isRequired,
  onClickDeleteIcon: PropTypes.func.isRequired,
};

export default TableCategory;
