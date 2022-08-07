import React from 'react'
import { Slider, ThemeProvider, createTheme } from '@mui/material'

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
        main: '#c026d3',
        contrastText: '#fff'
      },
      black: {
        main: '#000000',
        contrastText: '#fff'
      }
    }
  })
  

export const Slide = ({name, value, min, max, step, handelChange, disable}) => {

    return (
        <section className='mx-2 my-1'>
            <h2 className={(disable) ? 'text-zinc-400' : 'text-xl text-black tracking-wide'}>
                <span className='txt3 font-extrabold'>
                    {`${name} `}
                </span>
                <span>
                    {`${value}${(name !== 'Invert') ? '%' : ''}`}
                </span>
            </h2>
            {/* <input 
                className='w-full'
                type='range'
                min={min}
                max={max}
                va={value}
                onChange={handelChange}
            /> */}
            <ThemeProvider theme={theme}>
                <Slider 
                    aria-label={name}
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handelChange}
                    color="black"
                    disabled={disable}
                />
            </ThemeProvider>
           
          

        </section>
        
    )
}
