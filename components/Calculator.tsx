import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, List, ListItem, Paper, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { FormEvent, useState } from "react"
import { NumericInput } from "./NumericInput";
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import LockIcon from '@mui/icons-material/Lock';
import { v4 as uuidv4} from 'uuid';

type PayOption = {
  id: string;
  bill: number;
  payerNum: number;
}
export const Calculator = () => {
  const [totalBill, setTotalBill] = useState<number>(0);
  const [totalPayerNum, setTotalPayerNum] = useState<number>(0);
  const [optionBill, setOptionBill] = useState<number>(0);
  const [optionPayerNum, setOptionPayerNum] = useState<number>(0);
  const [payOptions, setPayOptions] = useState<PayOption[]>([]);
  const [ceilUnit, setCeilUnit] = useState<number>(1);

  const generalPayerNum = totalPayerNum - payOptions.reduce((totalPayerNum, option) => totalPayerNum + option.payerNum, 0)
  const generalBill = generalPayerNum === 0 ? 0 : Math.ceil((totalBill - payOptions.reduce((totalBill, option) => totalBill + option.bill * option.payerNum, 0)) / generalPayerNum / ceilUnit) * ceilUnit;
  const totalPay = generalBill * generalPayerNum + payOptions.reduce((totalBill, option) => totalBill + option.bill * option.payerNum, 0);
  const remaining = totalPay - totalBill;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPayOptions([
      ...payOptions,
      {
        id: uuidv4(),
        bill: optionBill,
        payerNum: optionPayerNum
      },
    ])
    setOptionBill(0);
    setOptionPayerNum(0);
  }

 return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <NumericInput
            label="お会計"
            adorment="円"
            value={totalBill || ''}
            setter={setTotalBill}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <NumericInput
            label="人数"
            value={totalPayerNum || ''}
            setter={setTotalPayerNum}
            adorment="人"
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
      <TableContainer sx={{mt: 2}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: "bold"}}>
                  支払い金額
              </TableCell>
              <TableCell sx={{fontWeight: "bold"}}>
                  人数
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {generalBill || 0} 円
              </TableCell>
              <TableCell>
                {generalPayerNum || 0} 人
              </TableCell>
              <TableCell sx={{width: 0}} size="small" align="right"></TableCell>
            </TableRow>
            {payOptions.map(option => (
              <TableRow key={option.id}>
                <TableCell>
                  {option.bill || '- '} 円
                </TableCell>
                <TableCell>
                  {option.payerNum || '- '} 人
                </TableCell>
                <TableCell sx={{width: 0}} size="small" align="right">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => setPayOptions(payOptions.filter(prevOption => prevOption.id !== option.id ))}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{mt: 2}}>
        <Typography variant="caption">
          切り上げ単位
        </Typography>
      </Box>
      <RadioGroup
        row
        defaultValue="1"
        aria-labelledby="round-option"
        value={ceilUnit}
        onChange={(e) => setCeilUnit(Number(e.currentTarget.value))}
      >
        <FormControlLabel value="1" control={<Radio size="small" />} label="1円" />
        <FormControlLabel value="10" control={<Radio size="small" />} label="10円" />
        <FormControlLabel value="100" control={<Radio size="small" />} label="100円" />
        <FormControlLabel value="1000" control={<Radio size="small" />} label="1000円" />
      </RadioGroup>
      <Box sx={{mt: 2, mb: 1}}>
        <Typography variant="caption">
          支払い金額が違う人を追加する
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <NumericInput
              label="金額"
              adorment="円"
              value={optionBill || ''}
              setter={setOptionBill}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <NumericInput
              label="人数"
              adorment="人"
              value={optionPayerNum || ''}
              setter={setOptionPayerNum}
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
        <Stack>
          <Button
            type="submit"
            sx={{mt: 1}}
            variant="outlined"
            size="small"
            disabled={optionBill === 0 || optionPayerNum === 0}
          >
            <Typography variant="button">
              追加
            </Typography>
          </Button>
        </Stack>
      </form>
      <TableContainer sx={{mt: 2}} component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" sx={{fontWeight: "bold"}}>
                お会計
              </TableCell>
              <TableCell align="right">
                {totalBill || 0} 円
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{fontWeight: "bold"}}>
                お預かり
              </TableCell>
              <TableCell align="right">
                {totalPay || 0} 円
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" sx={{fontWeight: "bold"}}>
                {remaining >= 0 ? "お釣り" : "不足金額"}
              </TableCell>
              <TableCell align="right">
                {remaining >= 0 ? remaining || 0 : -remaining || 0} 円
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
