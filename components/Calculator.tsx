import { Alert, Button, ButtonGroup, Fade, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { MouseEventHandler, useState } from "react"
import { NumericInput } from "./NumericInput";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { v4 as uuidv4} from 'uuid';
import { useRecoilState, useRecoilValue } from "recoil";
import { ceilUnitState, generalBillState, generalPayerNumState, optionPayerNumState, payOptionsState, remainingState, totalBillState, totalPayerNumState, totalPayState } from "../lib/state";
import { theme } from "../theme";

export const Calculator = () => {
  const [totalBill, setTotalBill] = useRecoilState(totalBillState);
  const [totalPayerNum, setTotalPayerNum] = useRecoilState(totalPayerNumState);
  const [payOptions, setPayOptions] = useRecoilState(payOptionsState);
  const [ceilUnit, setCeilUnit] = useRecoilState(ceilUnitState);

  const [isOpenOption, setIsOpenOption] = useState(false);
  const [optionBill, setOptionBill] = useState<number>(0);
  const [optionPayerNum, setOptionPayerNum] = useState<number>(0);

  const generalPayerNum = useRecoilValue(generalPayerNumState);
  const optionTotalPayerNum = useRecoilValue(optionPayerNumState);
  const generalBill = useRecoilValue(generalBillState);
  const totalPay = useRecoilValue(totalPayState);
  const remaining = useRecoilValue(remainingState);

  const setTotalPayerNumWithResetOptions = (num: number) => {
    if (num - optionTotalPayerNum < 0) {
      setPayOptions([]);
    }
    setTotalPayerNum(num);
  }

  const handleClick: MouseEventHandler = (e) => {
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
    setPayOptions((prevOptions) => {
      return [
        ...prevOptions.map(option => {
          if (option.id === id) {
            return {
              ...option,
              payerNum: option.payerNum + 1
            };
          } else {
            return option;
          }
        })
      ];
    })
  }

  const decrementOptionPayerNum = (id: string) => {
    setPayOptions((prevOptions) => {
      return [
        ...prevOptions.map(option => {
          if (option.id === id) {
            return {
              ...option,
              payerNum: option.payerNum - 1
            };
          } else {
            return option;
          }
        })
      ];
    })
  }

  const disableAddOptionButton: boolean = (
    optionPayerNum === 0
    || optionBill === 0
    || optionTotalPayerNum + optionPayerNum > totalPayerNum
  );

 return (
    <>
      <Alert severity="success">
        <Typography variant="caption">
          リアルタイムで変更を検知して再計算されます
        </Typography>
      </Alert>
      <Grid container columnSpacing={1} sx={{mt: 2}}>
        <Grid item xs={7}>
          <NumericInput
            label="お会計"
            adorment="円"
            value={totalBill}
            setter={setTotalBill}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <NumericInput
            label="合計人数"
            value={totalPayerNum}
            setter={setTotalPayerNumWithResetOptions}
            adorment="人"
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{mt: 4}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small" variant="head">
                  <Typography variant="caption" color={theme.palette.text.secondary}>
                    支払い金額
                  </Typography>
              </TableCell>
              <TableCell size="small" variant="head" align="right">
                  <Typography variant="caption" color={theme.palette.text.secondary}>
                    人数
                  </Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ 'tr:last-child td, tr:last-child th': {border: 0}}}>
            <TableRow>
              <TableCell>
                {generalBill} 円
              </TableCell>
              <TableCell align="right">
                {generalPayerNum} 人
              </TableCell>
              <TableCell sx={{width: 136}} align="right">
                <FormControl sx={{width: 110}}>
                  <InputLabel id="ceil-unit-label">端数切上</InputLabel>
                  <Select
                    labelId="ceil-unit-label"
                    id="ceil-unit"
                    value={ceilUnit}
                    label="端数切上"
                    size="small"
                    onChange={(e) => setCeilUnit(Number(e.target.value))}
                  >
                    <MenuItem value={1}>1円</MenuItem>
                    <MenuItem value={10}>10円</MenuItem>
                    <MenuItem value={50}>50円</MenuItem>
                    <MenuItem value={100}>100円</MenuItem>
                    <MenuItem value={500}>500円</MenuItem>
                    <MenuItem value={1000}>1000円</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
            {payOptions.map(option => (
              <TableRow key={option.id}>
                <TableCell>
                  {option.bill || '- '} 円
                </TableCell>
                <TableCell align="right">
                  {option.payerNum || '- '} 人
                </TableCell>
                <TableCell sx={{width: 136, py: 1}} align="right">
                  <ButtonGroup variant="text" size="small">
                    <Button
                      color="error"
                      onClick={() => removeOption(option.id)}
                    >
                      <DeleteIcon />
                    </Button>
                    <Button
                      onClick={() => decrementOptionPayerNum(option.id)}
                      disabled={option.payerNum <= 1}
                    >
                      <RemoveIcon />
                    </Button>
                    <Button
                      onClick={() => incrementOptionPayerNum(option.id)}
                      disabled={generalPayerNum <= 0}
                    >
                      <AddIcon />
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!isOpenOption && (
        <Button
          sx={{ mt: 2, height: 40 }}
          fullWidth
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setIsOpenOption(true)}
        >
          異なる支払金額の人を追加する
        </Button>
      )}
      {isOpenOption && (
        <Fade in={isOpenOption}>
          <Grid container columnSpacing={1} sx={{ mt: 2}}>
            <Grid item xs={5}>
              <NumericInput
                label="金額"
                adorment="円"
                value={optionBill}
                setter={setOptionBill}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <NumericInput
                label="人数"
                adorment="人"
                value={optionPayerNum}
                setter={setOptionPayerNum}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                sx={{height: '100%'}}
                type="submit"
                variant="contained"
                disabled={disableAddOptionButton}
                onClick={handleClick}
              >
                <Typography variant="button">
                  追加
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Fade>
      )}
      <TableContainer component={Paper} sx={{mt: 4}}>
        <Table>
          <TableBody sx={{ 'tr:last-child td, tr:last-child th': {border: 0}}}>
            <TableRow>
              <TableCell component="th" scope="row">
                集まる金額
              </TableCell>
              <TableCell align="right">
                {totalPay} 円
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                {remaining >= 0 ? "お釣り" : "不足金額"}
              </TableCell>
              <TableCell align="right">
                {remaining >= 0 ? remaining: -remaining} 円
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
