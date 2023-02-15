import { Box, Container } from '@mui/material'
import type { FC, ReactNode } from 'react'

import { Header } from '../components/common'

interface Props {
  children: ReactNode
}

const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <Box>
      <Header />
      <Container maxWidth="xl">{children}</Container>
    </Box>
  )
}

export default AdminLayout
