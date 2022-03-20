import { css } from "@emotion/react"
import { Calculator } from "../components/Calculator"
import { Header } from "../components/Header"

const Home = () => (
  <div css={styles.container}>
    <Header />
    <Calculator />
  </div>
)

const styles = {
  container: css`
    max-width: 400px;
    margin: 0 auto;
  `,
}

export default Home
