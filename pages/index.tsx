import { AppBar, Box, Container, Hidden, Toolbar, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Calculator } from "../components/Calculator"
import config from "../lib/config"
import { ceilUnitOriginState, PayOption, payOptionsState, totalBillState, totalPayerNumState } from "../lib/state";
import { v4 as uuidv4} from 'uuid';
import { LinkShareFab } from "../components/LinkShareFab";
import { LinkShareButton } from "../components/LinkShareButton";

const Home = () => {
  const router = useRouter();
  const { tb, tp, c, op } = router.query;
  const setTotalBill = useSetRecoilState(totalBillState);
  const setTotalPayerNum = useSetRecoilState(totalPayerNumState);
  const setCeilUnitOrign = useSetRecoilState(ceilUnitOriginState);
  const setPayOptions = useSetRecoilState(payOptionsState);

  useEffect(() => {
    const totalBill = Number.isInteger(Number(tb)) ? Number(tb) : undefined;
    const totalPayerNum = Number.isInteger(Number(tp)) ? Number(tp) : undefined;
    const ceilUnit = Number.isInteger(Number(c)) ? Number(c) : undefined;

    totalBill && setTotalBill(totalBill);
    totalPayerNum && setTotalPayerNum(totalPayerNum);
    ceilUnit && setCeilUnitOrign(ceilUnit);

    const options: PayOption[] = [];
    if (Array.isArray(op)) {
      op.forEach(option => {
        const [opb, opp] = option.split(',');
        const bill = Number.isInteger(Number(opb)) ? Number(opb) : undefined;
        const payerNum = Number.isInteger(Number(opp)) ? Number(opp) : undefined;
        if (bill && payerNum) {
          options.push({ id: uuidv4(), bill, payerNum });
        }
      })
    } else if (op) {
      const [opb, opp] = op.split(',');
      const bill = Number.isInteger(Number(opb)) ? Number(opb) : undefined;
      const payerNum = Number.isInteger(Number(opp)) ? Number(opp) : undefined;
      if (bill && payerNum) {
        options.push({ id: uuidv4(), bill, payerNum });
      }
    }
    if (totalBill && totalPayerNum && options.reduce((prev, option) => prev + option.payerNum, 0) <= totalPayerNum) {
      setPayOptions(options)
    }
  })

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h1" fontWeight="bold" sx={{ flexGrow: 1 }}>
            {config.title}
          </Typography>
          <Hidden smDown>
            <LinkShareButton />
          </Hidden>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Box sx={{my: 2}}>
          <Calculator />
        </Box>
      </Container>
      <Hidden smUp>
        <LinkShareFab />
      </Hidden>
    </>
  )
}

export default Home
