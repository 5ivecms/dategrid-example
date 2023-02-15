import AdbIcon from '@mui/icons-material/Adb'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import type { FC } from 'react'
import { Link } from 'react-router-dom'

import { routesConfig } from '../../../core/config'
import { headerMenu } from './header.data'
import { linkMenu, linksContainer, logoIcon, logoText, toolbar } from './style.sx'

const Header: FC = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={toolbar} disableGutters>
          <AdbIcon sx={logoIcon} />
          <Typography component={Link} sx={logoText} to={routesConfig.baseBrowseRoutes.home()} variant="h6" noWrap>
            Project
          </Typography>
          <Box sx={linksContainer}>
            {headerMenu.map((item) => (
              <Button key={item.url} component={Link} sx={linkMenu} to={item.url}>
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
