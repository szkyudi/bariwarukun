import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useRecoilValue } from "recoil"
import { peopleNumState, resultState } from "../states/calculator"
import { BigMoneyInput } from "./BigMoneyInput"
import { BigMoneyPeopleNumInput } from "./BigMoneyPeopleNumInput"
import { SmallMoneyInput } from "./SmallMoneyInput"
import { SmallMoneyPeopleNumInput } from "./SmallMoneyPeopleNumInput"
import { TotalMoneyInput } from "./TotalMoneyInput"
import { TotalPeopleNumInput } from "./TotalPeopleNumInput"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { NormalMoneyInput } from "./NormalMoneyInput"
import { NormalMoneyPeopleNumInput } from "./NormalMoneyPeopleNumInput"

export const Calculator = () => {
  const result = useRecoilValue(resultState);
  const peopleNum = useRecoilValue(peopleNumState);
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={8}><TotalMoneyInput fullWidth /></Grid>
        <Grid item xs={4}><TotalPeopleNumInput fullWidth /></Grid>
      </Grid>
      <Box sx={{mt: 1}}>
        <Accordion defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="h2" variant="button">普通に払う人</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={8}><NormalMoneyInput fullWidth /></Grid>
              <Grid item xs={4}><NormalMoneyPeopleNumInput fullWidth /></Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="h2" variant="button">多めに払う人</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={8}><BigMoneyInput fullWidth /></Grid>
              <Grid item xs={4}><BigMoneyPeopleNumInput fullWidth /></Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="h2" variant="button">少なめに払う人</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={8}><SmallMoneyInput fullWidth /></Grid>
              <Grid item xs={4}><SmallMoneyPeopleNumInput fullWidth /></Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
      <TableContainer sx={{mt: 3}}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">合計</TableCell>
              <TableCell align="right">{result.total || '- '}円</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">お預かり</TableCell>
              <TableCell align="right">{result.pay || '- '}円</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">お釣り</TableCell>
              <TableCell align="right">{result.remaining || '- '}円</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
