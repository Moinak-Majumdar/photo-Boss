import React from 'react'
import { Button, ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme ({
    palette: {
      purple: {
        main: '#5372f0',
        contrastText: '#fff'
      },
      blue : {
        main: '#536dfe',
        contrastText: '#fff'
      },
      fuchsia: {
        main: 'rgb(244, 114, 182)',
        contrastText: '#fff'
      },
      black: {
        main: '#000000',
        contrastText: '#fff'
      }
    }
  })

export const Choice = ({choice}) => {

    return (
        <section className='min-w-full px-2 py-4 bg-gradient-to-r from-indigo-400 to-slate-100 flex justify-end'>
            <ThemeProvider theme={theme}>
                <div className='md:m-2 m-1'>
                    <Button  variant='contained' color='fuchsia' onClick={() => {choice('preset')}}>presets</Button>
                </div>
                <div className='md:m-2 m-1'>
                    <Button  variant='contained' color='purple' onClick={() => {choice('filter')}}>custom</Button>
                </div>
                <div className='md:m-2 m-1'>
                    <Button  variant='contained' color='blue' onClick={() => {choice('flips')}}>flips</Button>
                </div>
            </ThemeProvider>
        </section>
    )
}
