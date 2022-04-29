import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material"
import { Calculator } from "../components/Calculator"
import config from "../lib/config"

const Home = () => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography component="h1" fontWeight="bold">
          {config.title}
        </Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth="sm">
      <Box sx={{my: 2}}>
        <Calculator />
      </Box>
    </Container>
  </>
)
export default Home
