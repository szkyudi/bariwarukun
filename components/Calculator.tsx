import { Alert, Button, ButtonGroup, Fade, FormControl, FormControlLabel, FormGroup, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { ChangeEventHandler, MouseEventHandler, useState } from "react"
import { NumericInput } from "./NumericInput";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { v4 as uuidv4} from 'uuid';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { 調整前切上単位, 切上単位, 一般請求額, 一般支払人数, オプション支払人数, 調整前支払オプション, お釣り, お会計, 支払人数, 支払総額, 支払オプション } from "../lib/state";
import { theme } from "../theme";

export const Calculator = () => {
  const [totalBill, setTotalBill] = useRecoilState(お会計);
  const [totalPayerNum, setTotalPayerNum] = useRecoilState(支払人数);
  const setPayOptions = useSetRecoilState(調整前支払オプション);
  const payOptions = useRecoilValue(支払オプション);
  const setCeilUnitOrigin = useSetRecoilState(調整前切上単位);
  const ceilUnit = useRecoilValue(切上単位);

  const [isOpenOption, setIsOpenOption] = useState(false);
  const [isOpenBillInput, setIsOpenBillInput] = useState(false);
  const [optionBill, setOptionBill] = useState(0);
  const [optionRatio, setOptionRatio] = useState<string>("1.0");
  const [optionPayerNum, setOptionPayerNum] = useState<number>(0);

  const generalTotalPayerNum = useRecoilValue(一般支払人数);
  const optionTotalPayerNum = useRecoilValue(オプション支払人数);
  const generalBill = useRecoilValue(一般請求額);
  const totalPay = useRecoilValue(支払総額);
  const remaining = useRecoilValue(お釣り);

  const setTotalPayerNumWithResetOptions = (num: number) => {
    if (num - optionTotalPayerNum < 0) {
      setPayOptions([]);
    }
    setTotalPayerNum(num);
  }

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    if (isOpenBillInput) {
      setPayOptions(prevOptions => [
        ...prevOptions,
        {
          id: uuidv4(),
          bill: optionBill,
          payerNum: optionPayerNum
        },
      ])
      setOptionBill(0);
      setOptionPayerNum(0);
    } else {
      if (Number(optionRatio) && Number(optionRatio) !== 0) {
        setPayOptions(prevOptions => [
          ...prevOptions,
          {
            id: uuidv4(),
            ratio: Number(optionRatio),
            payerNum: optionPayerNum
          },
        ])
        setOptionRatio("1.0");
        setOptionPayerNum(0);
      }
    }
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
    || Number(optionRatio) === 0
    || optionTotalPayerNum + optionPayerNum > totalPayerNum
  );

 return (
    <>
      <Alert severity="info">
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
              <TableCell sx={{width: 136}} align="right">
                <FormControl sx={{width: 110}}>
                  <InputLabel id="ceil-unit-label">端数切上</InputLabel>
                  <Select
                    labelId="ceil-unit-label"
                    id="ceil-unit"
                    value={ceilUnit}
                    label="端数切上"
                    size="small"
                    onChange={(e) => setCeilUnitOrigin(Number(e.target.value))}
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
          </TableHead>
          <TableBody sx={{ 'tr:last-child td, tr:last-child th': {border: 0}}}>
            <TableRow>
              <TableCell>
                {generalBill} 円
              </TableCell>
              <TableCell align="right">
                {generalTotalPayerNum} 人
              </TableCell>
              <TableCell align="right">
                <ButtonGroup variant="text" size="small">
                    <Button
                      aria-label="人数を減らすボタン"
                      onClick={() => setTotalPayerNum(totalPayerNum - 1)}
                      disabled={generalTotalPayerNum <= 0}
                    >
                      <RemoveIcon />
                    </Button>
                    <Button
                      aria-label="人数を増やすボタン"
                      onClick={() => setTotalPayerNum(totalPayerNum + 1)}
                    >
                      <AddIcon />
                    </Button>
                  </ButtonGroup>
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
                      aria-label="人数を減らすボタン"
                      onClick={() => decrementOptionPayerNum(option.id)}
                      disabled={option.payerNum <= 1}
                    >
                      <RemoveIcon />
                    </Button>
                    <Button
                      aria-label="人数を増やすボタン"
                      onClick={() => incrementOptionPayerNum(option.id)}
                      disabled={generalTotalPayerNum <= 0}
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
              {isOpenBillInput ? (
                <NumericInput
                  label="金額"
                  adorment="円"
                  value={optionBill}
                  setter={setOptionBill}
                  size="small"
                  fullWidth
                />
              ) : (
                <FormControl variant="outlined" size="small">
                  <InputLabel>比率</InputLabel>
                  <OutlinedInput
                    value={optionRatio}
                    onChange={(e) => setOptionRatio(e.target.value)}
                    endAdornment={<InputAdornment position="end">倍</InputAdornment>}
                    label="比率"
                    size="small"
                    onFocus={(e) => e.currentTarget.select()}
                  />
                </FormControl>
              )}
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
            <Grid item xs={12}>
              <FormControlLabel
                sx={{m: 0, mt: 1}}
                control={
                  <Switch size="small" onChange={(e) => setIsOpenBillInput(e.target.checked)} />
                }
                label="金額で入力"
              />
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
