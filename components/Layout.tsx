import { createTheme, ThemeProvider } from '@mui/material'
import { ruRU } from '@mui/material/locale'
import Grid2 from '@mui/material/Unstable_Grid2'
import { Component } from 'react'

import Footer from './Footer'
import Header from './Header'

declare module '@mui/system' {
  interface BreakpointOverrides {
    laptop: true
    tablet: true
    mobile: true
    desktop: true
    xs: false
    sm: false
    md: false
    lg: false
    xl: false
  }
}

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

// const { isMobile } = useMatchMedia()
// let overflow
//
// {
//   isMobile
//     ? (overflow = {
//         overflow: 'scroll',
//         overflowY: 'hidden',
//         padding: '0 15px',
//       })
//     : (overflow = {})
// }

class Layout extends Component<{ children: any }> {
  render() {
    const { children } = this.props

    return (
      <>
        <Header />

        <ThemeProvider theme={theme}>
          <Grid2
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
          >
            <main>{children}</main>
          </Grid2>
        </ThemeProvider>
        <Footer />
      </>
    )
  }
}

export default Layout
