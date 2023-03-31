import { createTheme, ThemeProvider } from '@mui/material'
import { ruRU } from '@mui/material/locale'
import { Component } from 'react'

import Footer from './Footer'
import Header from './Header'

const theme = createTheme(
  {
    palette: {
      mode: 'dark',
      primary: { main: '#eaeaea' },
      secondary: { main: '#ff7eb9' },
    },
    typography: {
      fontFamily: ['Comfortaa', 'TrebuchetMS'].join(','),
      fontSize: 16,
    },
  },
  ruRU
)

class Layout extends Component<{ children: any }> {
  render() {
    const { children } = this.props

    return (
      <>
        <Header />
        <ThemeProvider theme={theme}>
          <main>{children}</main>
        </ThemeProvider>
        <Footer />
      </>
    )
  }
}

export default Layout
