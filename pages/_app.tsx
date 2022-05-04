import { CssBaseline, ThemeProvider } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import { Seo } from '../components/Seo'
import { pageview } from '../lib/gtag'
import { theme } from '../theme'

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouterChange = (url) => {
      pageview(url);
    }
    router.events.on('routeChangeComplete', handleRouterChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouterChange);
    }
  }, [router.events])

  return (
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
}

export default App
