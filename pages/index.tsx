import { AppBar, Box, Container } from "@mui/material"
import { Calculator } from "../components/Calculator"

const Home = () => (
  <Container maxWidth="sm">
    <Box sx={{py: 4}}>
      <Calculator />
    </Box>
  </Container>
)
export default Home
