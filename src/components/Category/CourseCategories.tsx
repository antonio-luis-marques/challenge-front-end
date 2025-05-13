import React, { useState } from 'react'
import {
  Laptop,
  Server,
  Smartphone,
  Database,
  Settings,
  Brain,
  Star,
} from 'lucide-react'
import { Box, Typography, Tabs, Tab, useMediaQuery } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../../theme'
import { CourseCategory as CourseCategoryTypes } from '../../../types/courseCategory'
import { useContextCategoryCourse } from '../Provider/CategoryCourseProvider/CategoryCourseProvider'

interface CourseCategory {
  id: string
  name: CourseCategoryTypes | 'Top'
  icon: (color: string) => JSX.Element
  iconColor: string
}

const categories: CourseCategory[] = [
  {
    id: 'top',
    name: 'Top',
    icon: (color) => <Star size={24} color={color} />,
    iconColor: '#FFD700',
  },
  {
    id: '1',
    name: 'Frontend',
    icon: (color) => <Laptop size={24} color={color} />,
    iconColor: '#228B22',
  },
  {
    id: '2',
    name: 'Backend',
    icon: (color) => <Server size={24} color={color} />,
    iconColor: '#228B22',
  },
 
]

export default function CourseCategories() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { setCategoryCourse } = useContextCategoryCourse()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedIndex(newValue)
    const selected = categories[newValue]
    setCategoryCourse(selected.name === 'Top' ? null : selected.name)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ pt: 4 }}>
        <Tabs
          value={selectedIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={isSmallScreen ? false : 'auto'}
          allowScrollButtonsMobile={true}
          TabIndicatorProps={{ style: { display: 'none' } }}
          sx={{
            position: 'relative',  // Necessário para que as setas possam ser posicionadas de forma absoluta
            '& .MuiTab-root': {
              minWidth: 200,
              height: 60,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: 16,
              mr: 1,
              px: 2,
              border: '1.5px solid rgba(0,0,0,0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: '#fff',
              '&:hover': {
                backgroundColor: '#f9f9f9',
              },
            },
            '& .Mui-selected': {
              bgcolor: 'rgba(34, 139, 34, 0.1)',
              color: '#228B22',
              borderColor: '#228B22',
            },
            // Posicionando as setas no canto esquerdo e direito
            '& .MuiTabs-scrollButtons': {
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              backgroundColor: '#ccc',  // Cor de fundo zinc
              color: '#228B22',  // Cor verde para as setas
              borderRadius: '50%',  // Garantir formato circular
              width: 40,  // Definindo largura e altura iguais para o círculo
              height: 40,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,  // Garantir que não haja padding extra
            },
            '& .MuiTabs-scrollButtons:first-of-type': {
              left: 0, // Canto esquerdo
            },
            '& .MuiTabs-scrollButtons:last-of-type': {
              right: 0, // Canto direito
            },
            '& .MuiTabs-scrollButtons.Mui-disabled': {
              opacity: 0,  // Deixar as setas invisíveis quando desabilitadas
            },
          }}
        >
          {categories.map((category) => (
            <Tab
              key={category.id}
              label={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    columnGap: 2,
                  }}
                >
                  <Typography sx={{ fontWeight: 500 }}>
                    {category.name === 'Top' ? 'Top Cursos' : category.name}
                  </Typography>
                  {category.icon('#666')}
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>
    </ThemeProvider>
  )
}