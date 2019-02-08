import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import PersonalPageCss from './PersonalPage.css'

const styles = theme => ({
  button: {
     margin: theme.spacing.unit,
   },
   input: {
     display: 'none',
   },
  table: {
    fontFamily: theme.typography.fontFamily,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {

  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc',
    };

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
          {label}
        </TableSortLabel>
      ) : (
        label
      );

    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ cellContentRenderer = null, className, dataKey, ...other }, index) => {
              let renderer;
              if (cellContentRenderer != null) {
                renderer = cellRendererProps =>
                  this.cellRenderer({
                    cellData: cellContentRenderer(cellRendererProps),
                    columnIndex: index,
                  });
              } else {
                renderer = this.cellRenderer;
              }

              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classNames(classes.flexContainer, className)}
                  cellRenderer={renderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func,
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56,
};

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);



let id = 0;
function createData(coin, initialprice, amount, currentprice, total, netto) {
  id += 1;
  return { id, coin, initialprice, currentprice, total, netto };
}


function ReactVirtualizedTable(props) {
  const { classes} = props;
  let rows = props.state.coins.map((coin,index)=>{
    let current= (!!props.state.coins_current_values[coin.coin]?props.state.coins_current_values[coin.coin].eur:0)

    return {id:index+1, coin: coin.coin[0].toUpperCase()+coin.coin.slice(1), currentprice: current , initialprice: coin.price_per_unit , amount: coin.amount, netto: Math.round((coin.amount*(current-coin.price_per_unit)) * 100) / 100, total: Math.round(coin.amount*current * 100) }
  })

  return (
    <>
    <Paper style={{ height: '100%', width: '100%' }}>
      <WrappedVirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        onRowClick={event => props.graph(event.rowData.coin)}
        columns={[
          {
            width: 200,
            flexGrow: 1.0,
            label: 'Coin',
            dataKey: 'coin',
          },
          {
            width: 160,
            label: 'Price purchased EUR',
            dataKey: 'initialprice',
            numeric: true,
          },
          {
            width: 160,
            label: 'Current Price EUR',
            dataKey: 'currentprice',
            numeric: true,
          },
          {
            width: 160,
            label: 'Amount',
            dataKey: 'amount',
            numeric: true,
          },
          {
            width: 160,
            label: 'Total Coins Value',
            dataKey: 'total',
            numeric: true,
          },
          {
            width: 160,
            label: 'Net in EUR',
            dataKey: 'netto',
            numeric: true,
          }
        ]}
      />
    </Paper>

    <Button onClick={()=>{props.showTotal()}} variant="contained" color="primary" className={classes.button}>
          Total
    </Button>
    </>
  );
}

ReactVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReactVirtualizedTable);
