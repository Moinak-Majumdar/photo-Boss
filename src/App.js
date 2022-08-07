import './App.css';
import React, { useState, useRef, useEffect } from 'react'
import { InputImg } from './components/InputImg'
import { Button, createTheme, ThemeProvider, Typography } from '@mui/material';
import { Upload, Refresh, SaveAlt } from '@mui/icons-material'
import { Slide } from './components/Slide'
import { Choice } from './components/Choice';
import { About } from './components/About';
import { data } from './components/presetData'
import { TbFlipHorizontal, TbFlipVertical } from 'react-icons/tb'
import { AiOutlineRotateLeft, AiOutlineRotateRight } from 'react-icons/ai'


const theme = createTheme ({
  typography : {
    fontFamily: [
      'Poiret One',
    ].join(','),
    h6: {
      fontWeight: 900,
      fontSize: 18,
      letterSpacing: 2,
      margin: 4,
      '@media (max-width:640px)': {
        fontSize: 15,
        letterSpacing: 1,
        margin: 2,
      }
    },
  },
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

function App() {

  const [options, setOptions] = useState(data[0]);
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
      setOptions(data[0])
      setRotateCount(0)
      setHorFlip(1)
      setVerFlip(1)
  }

  const childRef = useRef(null)
  function handelSave() {
    childRef.current.save();  
  }

  useEffect(() => {
    if(img !== null) {
      setDisable(false)
    }
  },[img])

  const [showPresets, setShowPresets] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [showFlips, setShowFlips] = useState(false)

  function choice(params) {
    switch (params) {
      case 'preset' : 
        setShowPresets(true) 
        setShowFilters(false) 
        setShowFlips(false)
        break;
      
      case 'filter' : 
        setShowPresets(false) 
        setShowFilters(true) 
        setShowFlips(false)
        handelReset()
        break;
      
      case 'flips':
        setShowPresets(false) 
        setShowFilters(false) 
        setShowFlips(true)
        break;
    }
  }

  function setPreset(params) {
    switch(params) {
      case "def" :
        setOptions(data[0])
        break; 
      case 'bright' :
        setOptions(data[1]);
        break;
      case 'dark' :
        setOptions(data[2]);
        break;
      case 'dew' :
        setOptions(data[3]);
        break;
      case 'ginkgo' :
        setOptions(data[4]);
        break;
      case 'memo' :
        setOptions(data[5]);
        break;
      case 'natural' :
        setOptions(data[6]);
        break;
      case 'story' :
        setOptions(data[7]);
        break;
      case 'time' :
        setOptions(data[8]);
        break;
      case 'vintage' :
        setOptions(data[9]);
        break;
      case 'warm' :
        setOptions(data[10]);
        break;
    }
  }

  return (
      <section className='box flex flex-col bg-gradient-to-b from-slate-100 to-slate-300 border border-zinc-300 shadow-gray-400 shadow-2xl md:rounded-xl z-10 overflow-hidden'>
        {/* hl7 image part */}
        <section className='h-auto min-w-full rounded-sm flex flex-col z-10'>
          <input hidden type="file" ref={imgRef} accept="image/*" name="image-upload" id="input" onChange={(e) => {setImg(e.target.files[0])}}/>
          <div className="min-w-full relative flex justify-end flex-row bg-gradient-to-b from-slate-400 to-slate-100 p-1">
            <About/>
            <div className="md:m-2 m-1">
              <Button color="error" variant='contained' onClick={handelReset} disabled={disable}><Refresh/></Button>            
            </div>
            <div className="md:m-2 m-1">
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="blue" onClick={() => {imgRef.current.click()}}><Upload/></Button>
              </ThemeProvider> 
            </div>
            <div className="md:m-2 m-1">
              <ThemeProvider theme={theme}>
                <Button variant='contained' color="black" onClick={handelSave} disabled={disable}><SaveAlt/></Button>
              </ThemeProvider> 
            </div>
          </div>
          <div className='min-w-full p-2 flex justify-center items-center'>
            {img && <InputImg 
                file={img} 
                style={options}
                rotate={rotateCount}
                horFlip={horFlip}
                verFlip={verFlip}
                ref={childRef}
              />}
            {!img && <div className="image-size border border-gray-300 rounded-xl flex justify-center items-center p-2 cursor-pointer bg-gradient-to-b from-slate-100 via-slate-300 to-slate-100" 
              onClick={() => {imgRef.current.click()}}>
                <span className="txt1 w-fit text-3xl animate-pulse">Upload an Image</span>
            </div>}  
          </div>
        </section>
        {/* hl2 choice part */}
          <Choice 
            choice={choice}
          />      
        {/* hl7 selected choice */}
        <section className='relative min-w-ful h-auto p-2 z-10'>
          <div className='absolute top-20 -right-10 w-96 h-96 md:w-30r md:h-30r  rounded-full bg-gradient-to-bl from-slate-200 via-pink-400 to-indigo-500 opacity-70 -z-10'></div>
          {/*hl6 choice preset  */}
          <div className={showPresets ? 'mt-4' : 'hidden'}>
            <h2 className='text-xl font-bold m-2 txt2'>Preset Filters</h2> 
            <ThemeProvider theme={theme}>
              <div className='mt-2 grid grid-cols-3 md:grid-cols-4 gap-3 p-2'>
                <Button variant={(data[0] == options) ? 'contained' : 'outlined'} disabled={disable} onClick={() => setPreset('def')}>
                  <Typography variant='h6'>default</Typography>
                </Button>
                <Button variant={(data[1] == options) ? 'contained' : 'outlined'} disabled={disable} onClick={() => setPreset('bright')}>
                  <Typography variant='h6'>bright</Typography>
                </Button>
                <Button variant={(data[2] == options) ? 'contained' : 'outlined'} disabled={disable} onClick={() => setPreset('dark')}>
                  <Typography variant='h6'>dark</Typography>
                </Button>
                <Button variant={(data[3] == options) ? 'contained' : 'outlined'} disabled={disable} onClick={() => setPreset('dew')}>
                  <Typography variant='h6'>dew</Typography>
                </Button>
                <Button variant={(data[4] == options) ? 'contained' : 'outlined'} disabled={disable} onClick={() => setPreset('ginkgo')}>
                  <Typography variant='h6'> ginkgo</Typography>
                </Button>
                <Button variant={(data[5] == options) ? 'contained' : 'outlined'} disabled={disable} onClick={() => setPreset('memo')}>
                  <Typography variant='h6'>memo</Typography>
                </Button>
                <Button variant={(data[6] == options) ? 'contained' : 'outlined'} disabled={disable} onClick={() => setPreset('natural')}>
                  <Typography variant='h6'>natural</Typography>
                </Button>
                <Button variant={(data[7] == options) ? 'contained' : 'outlined'} disabled={disable} onClick={() => setPreset('story')}>
                  <Typography variant='h6'>story</Typography>
                </Button>
                <Button variant={(data[8] == options) ? 'contained' : 'outlined'} disabled={disable} onClick={() => setPreset('time')}>
                  <Typography variant='h6'>time</Typography>
                </Button>
                <Button variant={(data[9] == options) ? 'contained' : 'outlined'} disabled={disable} onClick={() => setPreset('vintage')}>
                  <Typography variant='h6'>vintage</Typography>
                </Button>
                <Button variant={(data[10] == options) ? 'contained' : 'outlined'} disabled={disable} onClick={() => setPreset('warm')}>
                  <Typography variant='h6'>warm</Typography>
                </Button>
              </div>
            </ThemeProvider>
          </div>
          {/*hl1 choice filter */}
          <div className={showFilters ? 'mt-4': 'hidden'}>
            <h2 className='text-xl font-bold m-2 txt2'>Custom Filters</h2> 
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {options.map((curr, index) => {
                      return(
                        <ThemeProvider theme={theme} key={index}>
                            <Button 
                                variant={(index === selectOptionIndex) ? 'contained' : 'outlined' }
                                color={(index === selectOptionIndex) ? 'purple' : 'blue'} 
                                onClick={() => setSelectOptionIndex(index)}
                                disabled={disable}
                              >
                                <Typography variant='h6'>{curr.name}</Typography>                        
                            </Button>
                        </ThemeProvider>
                      )
                    })}
              </div>                           
              <div className='mx-2 mt-4'>
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
          {/* hl5 choice flips */}
          <div className={showFlips ? 'mt-4' : 'hidden'}>
            <h2 className='text-xl font-bold m-2 txt2'>Rotate & Flip</h2> 
            <div className='grid grid-cols-2 gap-2 w-80 mx-auto p-8'>
              <ThemeProvider theme={theme}>
                <Button variant="contained" color='fuchsia' disabled={disable} onClick={() => {setRotateCount(rotateCount + 1)}}>
                    <AiOutlineRotateLeft className='text-2xl'/>
                </Button>
                <Button variant="contained" color='fuchsia' disabled={disable} onClick={() => {setRotateCount(rotateCount - 1)}}>
                  <AiOutlineRotateRight className='text-2xl'/>
                </Button>
                <Button variant={(horFlip == -1) ? 'contained' : 'outlined'} color='blue' disabled={disable} onClick={() => setHorFlip(-horFlip)}>
                  <TbFlipVertical className='text-2xl'/>
                </Button>
                <Button variant={(verFlip == -1) ? 'contained' : 'outlined'} color='blue' disabled={disable} onClick={() => setVerFlip(-verFlip)}>
                  <TbFlipHorizontal className='text-2xl'/>
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </section>
      </section>
  )

}

export default App