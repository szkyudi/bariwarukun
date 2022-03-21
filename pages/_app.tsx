import { CssBaseline, ThemeProvider } from '@mui/material'
import { RecoilRoot } from 'recoil'
import { theme } from '../theme'

const App = ({ Component, pageProps }) => (
  <RecoilRoot>
    <CssBaseline enableColorScheme />
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </RecoilRoot>
)

export default App
