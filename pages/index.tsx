import { AppBar, Box, Container, Hidden, Toolbar, Typography, Zoom } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Calculator } from "../components/Calculator"
import config from "../lib/config"
import { 調整前切上単位, BasePayOption, 調整前支払オプション, お会計, 支払人数 } from "../lib/state";
import { v4 as uuidv4} from 'uuid';
import { LinkShareFab } from "../components/LinkShareFab";
import { LinkShareButton } from "../components/LinkShareButton";

const Home = () => {
  const router = useRouter();
  const { tb, tp, c, op } = router.query;
  const setTotalBill = useSetRecoilState(お会計);
  const setTotalPayerNum = useSetRecoilState(支払人数);
  const setCeilUnitOrign = useSetRecoilState(調整前切上単位);
  const setPayOptions = useSetRecoilState(調整前支払オプション);

  useEffect(() => {
    const totalBill = Number.isInteger(Number(tb)) ? Number(tb) : undefined;
    const totalPayerNum = Number.isInteger(Number(tp)) ? Number(tp) : undefined;
    const ceilUnit = Number.isInteger(Number(c)) ? Number(c) : undefined;

    totalBill && setTotalBill(totalBill);
    totalPayerNum && setTotalPayerNum(totalPayerNum);
    ceilUnit && setCeilUnitOrign(ceilUnit);

    const options: BasePayOption[] = [];
    if (Array.isArray(op)) {
      op.forEach(option => {
        const [opborr, opp] = option.split(',');
        const ratio = opborr.slice(-1) === 'x' && parseFloat(opborr) ? parseFloat(opborr) : undefined;
        const bill = Number.isInteger(Number(opborr)) ? Number(opborr) : undefined;
        const payerNum = Number.isInteger(Number(opp)) ? Number(opp) : undefined;
        if (ratio && payerNum) {
          options.push({ id: uuidv4(), ratio, payerNum });
        } else if (bill && payerNum) {
          options.push({ id: uuidv4(), bill, payerNum });
        }
      })
    } else if (op) {
      const [opborr, opp] = op.split(',');
      const ratio = opborr.slice(-1) === 'x' && parseFloat(opborr) ? parseFloat(opborr) : undefined;
      const bill = Number.isInteger(Number(opborr)) ? Number(opborr) : undefined;
      const payerNum = Number.isInteger(Number(opp)) ? Number(opp) : undefined;
      if (ratio && payerNum) {
        options.push({ id: uuidv4(), ratio, payerNum });
      } else if (bill && payerNum) {
        options.push({ id: uuidv4(), bill, payerNum });
      }
    }
    if (totalBill && totalPayerNum && options.reduce((prev, option) => prev + option.payerNum, 0) <= totalPayerNum) {
      setPayOptions(options)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

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
      <Container maxWidth="sm" sx={{pb: 8}}>
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
