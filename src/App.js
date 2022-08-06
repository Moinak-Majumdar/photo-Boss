import './App.css';
import React, { useState, useRef, useEffect } from 'react'
import { InputImg } from './components/InputImg'
import { Button } from '@mui/material';
import { Upload, RotateLeft, Refresh, RotateRight} from '@mui/icons-material'
import { Slide } from './components/Slide'
import { TbFlipHorizontal, TbFlipVertical } from 'react-icons/tb'
import { AiOutlineRotateLeft, AiOutlineRotateRight } from 'react-icons/ai'



function App() {

  const DEFAULT_OPTIONS = [
    {name: 'Brightness', value: 100, range: {min:0, max:200}, step: 1},
    {name: 'Contrast', value: 100, range: {min:0, max:200}, step: 1},
    {name: 'Saturation', value: 100, range: {min:0, max:200}, step: 1},
    {name: 'Sepia', value: 0, range: {min:0, max:100}, step: 1},
    {name: 'Hue', value: 0, range: {min:0, max:100}, step: 1},
    {name: 'Blur', value: 0, range: {min:0, max:100}, step: 1},
    {name: 'Grayscale', value: 0, range: {min:0, max:100}, step: 1},
    {name: 'Invert', value: 0, range: {min:0, max:1}, step: 0.1}
  ]

  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [selectOptionIndex, setSelectOptionIndex] = useState(0);
  const currentOption = options[selectOptionIndex];

  const [rotateCount, setRotateCount] = useState(0);
  const [horFlip, setHorFlip] = useState(1);
  const [verFlip, setVerFlip] = useState(1);
  
  const [img, setImg] = useState(null);
  const imgRef = useRef(null);

  const [disable, setDisable] = useState(true)

  function handelSliderChange({ target }) {
      setOptions((prev) => {
          return (
              prev.map((curr, index) => {
                  if( index !== selectOptionIndex) {
                      return curr
                  } else {
                      return {...curr, value: target.value}
                  }
              })
          )
      })
  }

  function handelReset () {
      setOptions(DEFAULT_OPTIONS)
      setRotateCount(0)
      setHorFlip(1)
      setVerFlip(1)
  }

  useEffect(() => {
    if(img !== null) {
      setDisable(false)
    }
  },[img])

  return (
      <section className='flex flex-col md:flex-row items-center p-12 bg-gray-100 rounded-xl w-fit h-auto z-10'>
        <div className='w-fit h-80 md:h-40r p-8 border border-blue-400 rounded-xl md:mr-12'>
            <div className='w-72'>
                <h2 className='text-2xl bold m-2'>Adjust Filters</h2>
                <div className='grid grid-cols-2 gap-2'>
                  {options.map((curr, index) => {
                    return(
                        <Button key={index} 
                            variant={(index === selectOptionIndex) ? 'contained' : 'outlined' }
                            color={(index === selectOptionIndex) ? 'secondary' : 'info'} 
                            onClick={() => setSelectOptionIndex(index)}
                            disabled={disable}
                        >
                            {curr.name}
                        </Button>
                    )
                  })}
                </div>
                <div className='mt-4'>
                    <div className='mx-2 my-1'>
                        <Slide
                            name={currentOption.name}
                            min={currentOption.range.min}
                            max={currentOption.range.max}
                            value={currentOption.value}
                            step={currentOption.step}
                            handelChange={handelSliderChange}
                            disable={disable}
                        />
                    </div>
                </div>
              <div className='mt-4'>
                  <h2 className='text-2xl bold m-2'>Rotate & Flip</h2> 
                  <div className='grid grid-cols-4 gap-2'>
                    <Button variant="outlined" disabled={disable} onClick={() => {setRotateCount(rotateCount + 1)}}>
                        <AiOutlineRotateLeft className='text-2xl'/>
                    </Button>
                    <Button variant="outlined" disabled={disable} onClick={() => {setRotateCount(rotateCount - 1)}}>
                      <AiOutlineRotateRight className='text-2xl'/>
                    </Button>
                    <Button variant={(horFlip == -1) ? 'contained' : 'outlined'} disabled={disable} onClick={() => setHorFlip(-horFlip)}>
                      <TbFlipVertical className='text-2xl'/>
                    </Button>
                    <Button variant={(verFlip == -1) ? 'contained' : 'outlined'} disabled={disable} onClick={() => setVerFlip(-verFlip)}>
                      <TbFlipHorizontal className='text-2xl'/>
                    </Button>
                  </div>
              </div>
            </div>
        </div>
        <div className='h-80 w-80 md:w-40r md:h-40r rounded-sm flex flex-col' >
            {img && <InputImg 
                file={img} 
                style={options}
                rotate={rotateCount}
                horFlip={horFlip}
                verFlip={verFlip}
              />}
            {!img && <div className="h-full w-full border border-black bg-gray-200 rounded-xl flex justify-center items-center p-2 cursor-pointer" onClick={() => {imgRef.current.click()}}>
                <span className="txt7 w-fit font-bold">Upload an Image</span>
            </div>}  
            <input hidden type="file" ref={imgRef} accept="image/*" name="image-upload" id="input" onChange={(e) => {setImg(e.target.files[0])}}/>
            <div className="w-full flex justify-end flex-col md:flex-row p-4">
                <div className="md:m-2 m-1">
                    <Button variant="outlined" startIcon={<Refresh/>} onClick={handelReset} disabled={disable}>reset effects</Button>
                </div>
                <div className="md:m-2 m-1">
                    <Button variant="contained" startIcon={<Upload/>} onClick={() => {imgRef.current.click()}}>Upload ImAGE</Button>
                </div>
            </div>
        </div>
      </section>
  )

}

export default App