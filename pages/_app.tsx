import { CssBaseline, ThemeProvider } from '@mui/material'
import { RecoilRoot } from 'recoil'
import { Seo } from '../components/Seo'
import { theme } from '../theme'

const App = ({ Component, pageProps }) => (
  <RecoilRoot>
    <CssBaseline enableColorScheme />
    <ThemeProvider theme={theme}>
      <Seo
        title="多機能割り勘電卓「ばりわるくん」"
      />
      <Component {...pageProps} />
    </ThemeProvider>
  </RecoilRoot>
)

export default App
