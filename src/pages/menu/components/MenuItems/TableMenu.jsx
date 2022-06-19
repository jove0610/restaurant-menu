import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { red, yellow } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
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
import MoreIcon from '@mui/icons-material/More';

import TablePaginationActions from '../../../../components/TablePaginationActions';

function TableMenu({
  menu,
  onClickEditIcon,
  onClickDeleteIcon,
  onClickMoreIcon,
}) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const menuArr = useMemo(
    () =>
      Object.keys(menu).map((key) => ({
        name: menu[key].name,
        category: menu[key].category || '',
      })),
    [menu]
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - menuArr.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer>
      <Table sx={{ width: 500, maxWidth: '80vw' }}>
        <TableBody>
          {(rowsPerPage > 0
            ? menuArr.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : menuArr
          ).map((item) => {
            const { name: menuName, category: menuCategory } = item;

            return (
              <TableRow key={menuName}>
                <TableCell component="th" scope="row">
                  <Stack alignItems="flex-start">
                    <Typography>{menuName}</Typography>
                    {menuCategory && (
                      <Chip
                        label={menuCategory}
                        color="secondary"
                        size="small"
                      />
                    )}
                  </Stack>
                </TableCell>

                <TableCell style={{ width: 160 }} align="right">
                  <Tooltip title="More" arrow>
                    <IconButton
                      onClick={() => onClickMoreIcon(menuName)}
                      sx={{ color: '#333' }}
                    >
                      <MoreIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Edit" arrow>
                    <IconButton
                      onClick={() => onClickEditIcon(item)}
                      sx={{ color: yellow[800] }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete" arrow>
                    <IconButton
                      onClick={() => onClickDeleteIcon(menuName)}
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
              count={menuArr.length}
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

TableMenu.propTypes = {
  menu: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
    })
  ).isRequired,
  onClickEditIcon: PropTypes.func.isRequired,
  onClickDeleteIcon: PropTypes.func.isRequired,
  onClickMoreIcon: PropTypes.func.isRequired,
};

export default TableMenu;
