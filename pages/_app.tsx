import { Global } from '@emotion/react'
import { globalStyles } from '../shared/styles'

const App = ({ Component, pageProps }) => (
  <>
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </>
)

export default App
