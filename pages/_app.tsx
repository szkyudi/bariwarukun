import { Global } from '@emotion/react'
import { RecoilRoot } from 'recoil'
import { globalStyles } from '../shared/styles'

const App = ({ Component, pageProps }) => (
  <RecoilRoot>
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </RecoilRoot>
)

export default App
