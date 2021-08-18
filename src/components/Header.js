import React from 'react'
import { Nav } from 'react-bootstrap'

const Header = () => {
    return (
<Nav variant="pills" defaultActiveKey="/home">
  <Nav.Item>
    <Nav.Link href="/home">Iniio</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="/login">login</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="disabled" disabled>
      Disabled
    </Nav.Link>
  </Nav.Item>
</Nav>
    )
}

export default Header
