import React, { useState } from 'react'
import { Slider } from '@mui/material'

export const Slide = (props) => {

    return (
        <section className='mx-2 my-1'>
            <h2>{`${props.name}  ${props.value}${(props.name !== 'Invert') ? '%' : ''}`}</h2>
            {/* <input 
                className='w-full'
                type='range'
                min={props.min}
                max={props.max}
                va={props.value}
                onChange={props.handelChange}
            /> */}

            <Slider 
                aria-label={props.name}
                size='small'
                value={props.value}
                min={props.min}
                max={props.max}
                step={props.step}
                onChange={props.handelChange}
                color="secondary"
                disabled={props.disable}
            />

        </section>
        
    )
}
