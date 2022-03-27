import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material"
import { Calculator } from "../components/Calculator"

const Home = () => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography component="h1" fontWeight="bold">
          割り勘電卓
        </Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth="sm">
      <Box sx={{my: 4}}>
        <Calculator />
      </Box>
    </Container>
  </>
)
export default Home
