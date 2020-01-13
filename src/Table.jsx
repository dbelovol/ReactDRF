import React,{useMemo} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeBlockSelector} from './Utils/Selectors.jsx'
import {useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.primary.light,
      // opacity: "0.9"
    },
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.secondary.light,
      // opacity: "0.9"
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles( theme=> ({
  table: {
    minWidth: 700,
    // overflow: "hidden"

  },
  item: {
    padding: theme.spacing(2)
  }, 
  subitem: {
    padding: theme.spacing(1)
  },
  header: {
    padding: theme.spacing(5),
  },
  text: {
    textTransform: "uppercase"
  },
  border: props => props.page_id != 0 ? {
    border: "solid",
    borderWidth: 1,
    borderColor: theme.palette.primary.main,
    borderRadius: 15,
    boxShadow: theme.shadows[2]
}: {},
  }));

export default function CustomizedTables(props) {
  const classes = useStyles(props);
  const {className, id} = props
    // Создание мемоизированного селектора для извлечения информации
    // По данным блока
    const tableDataSelector= useMemo (
      makeBlockSelector, 
      []
    )
    //  Получение информации о данных блока. Используется переданный в качестве prop
    //  идентификатор блока
    const tableData =  useSelector (state => 
      tableDataSelector(state, {id: id, type: "table"})
    )

  return (
    <div className={`${className} ${classes.border} ${classes.item}`} >
    <Grid container direction="column" alignItems="center" >
      <Grid item className={classes.header}>
        <Typography variant="h4" align="center" className={classes.text}>
          {tableData.header}
        </Typography>
      </Grid>
      <Grid item className={classes.item}>
        <Typography variant="h6" align="center">
          {tableData.subheader}
        </Typography>
      </Grid>
    </Grid>
        <TableContainer >
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                {tableData.col_header.trim().split(/\s*;\s*/).map((el,id) =>
                <StyledTableCell align="right" key={id} >{el}</StyledTableCell>
                )}   
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.table_rows.map(row => (
                <StyledTableRow key={row.id}>
                  {row.row.trim().split(/\s*;\s*/).map((el,id) => {
                  if ( id == 0) {
                    return (<StyledTableCell 
                              component="th" 
                              scope="row" 
                              key={id}
                            >
                              {el}
                            </StyledTableCell>)
                  }
                  else {
                    return (<StyledTableCell 
                              align="right" 
                              key={id}
                            >
                              {el.replace(/[Рр]уб\.?/, "")}
                              {el.search(/[Рр]уб\.?/) != -1 ?
                                <FontAwesomeIcon icon={['fas', 'ruble-sign']}/> : ""}
                            </StyledTableCell>)
                  }
                  })}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
}
