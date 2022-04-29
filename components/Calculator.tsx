import { Alert, Box, Button, ButtonGroup, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputLabel, List, ListItem, MenuItem, Paper, Radio, RadioGroup, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { FormEvent, useState } from "react"
import { NumericInput } from "./NumericInput";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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
  const [ceilUnit, setCeilUnit] = useState<number>(100);

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

  const removeOption = (id: string) => {
    setPayOptions(payOptions.filter(option => option.id !== id));
  }

  const incrementOptionPayerNum = (id: string) => {
    setPayOptions(payOptions.map(option => {
      if (option.id === id) {
        option.payerNum++;
      }
      return option;
    }))
  }

  const decrementOptionPayerNum = (id: string) => {
    if (payOptions.find(option => option.id === id).payerNum <= 1) {
      removeOption(id);
      return;
    }
    setPayOptions(payOptions.map(option => {
      if (option.id === id) {
        option.payerNum--;
      }
      return option;
    }))
  }

 return (
    <>
      <Alert severity="success">
        <Typography variant="caption">
          リアルタイムで変更を検知して再計算されます
        </Typography>
      </Alert>
      <Grid container spacing={1} sx={{mt: 1}}>
        <Grid item xs={7}>
          <NumericInput
            label="お会計"
            adorment="円"
            value={totalBill || ''}
            setter={setTotalBill}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <NumericInput
            label="合計人数"
            value={totalPayerNum || ''}
            setter={setTotalPayerNum}
            adorment="人"
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
      <Paper sx={{mt: 1}}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell size="small" variant="head">
                    <Typography variant="caption">
                      支払い金額
                    </Typography>
                </TableCell>
                <TableCell size="small" variant="head" align="right">
                    <Typography variant="caption">
                      人数
                    </Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{py: 1}}>
                  {generalBill || 0} 円
                </TableCell>
                <TableCell sx={{py: 1}} align="right">
                  {generalPayerNum || 0} 人
                </TableCell>
                <TableCell sx={{width: 136, py: 1}} align="right">
                  <FormControl sx={{width: 110}}>
                    <InputLabel id="ceil-unit-label">端数丸め</InputLabel>
                    <Select
                      labelId="ceil-unit-label"
                      id="ceil-unit"
                      value={ceilUnit}
                      label="端数丸め"
                      size="small"
                      onChange={(e) => setCeilUnit(Number(e.target.value))}
                    >
                      <MenuItem value={1}>1円</MenuItem>
                      <MenuItem value={10}>10円</MenuItem>
                      <MenuItem value={100}>100円</MenuItem>
                      <MenuItem value={1000}>1000円</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              {payOptions.map(option => (
                <TableRow key={option.id}>
                  <TableCell sx={{py: 1}}>
                    {option.bill || '- '} 円
                  </TableCell>
                  <TableCell sx={{py: 1}} align="right">
                    {option.payerNum || '- '} 人
                  </TableCell>
                  <TableCell sx={{width: 136, py: 1}} align="right">
                    <ButtonGroup variant="text" size="small">
                      <Button
                        onClick={() => decrementOptionPayerNum(option.id)}
                      >
                        <RemoveIcon />
                      </Button>
                      <Button
                        onClick={() => incrementOptionPayerNum(option.id)}
                        disabled={generalPayerNum <= 0}
                      >
                        <AddIcon />
                      </Button>
                      <Button
                        color="error"
                        onClick={() => removeOption(option.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{p: 2}}>
          <Typography variant="caption">
            多めや少なめに払う人たちの追加
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={7}>
                <NumericInput
                  label="金額"
                  adorment="円"
                  value={optionBill || ''}
                  setter={setOptionBill}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={5}>
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
                variant="contained"
                size="small"
                disabled={optionBill === 0 || optionPayerNum === 0}
              >
                <Typography variant="button">
                  追加
                </Typography>
              </Button>
            </Stack>
          </form>
        </Box>
      </Paper>
      <TableContainer sx={{mt: 1}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell size="small" component="th" scope="row">
                集まる金額
              </TableCell>
              <TableCell size="small" align="right">
                {totalPay || 0} 円
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell size="small" component="th" scope="row">
                {remaining >= 0 ? "お釣り" : "不足金額"}
              </TableCell>
              <TableCell size="small" align="right">
                {remaining >= 0 ? remaining || 0 : -remaining || 0} 円
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
