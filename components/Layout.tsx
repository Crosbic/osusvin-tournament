import { Component } from 'react'

import Footer from './Footer'
import Header from './Header'

class Layout extends Component<{ children: any }> {
  render() {
    const { children } = this.props

    return (
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    )
  }
}

export default Layout
