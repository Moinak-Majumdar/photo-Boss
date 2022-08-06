import React, { useState, useEffect }  from 'react'

export const InputImg = ({ file, style, rotate, horFlip, verFlip }) => {

    const [src, setSrc] = useState();

    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
        setSrc(reader.result) 
    }

    const brightness =  style[0].value;
    const contrast = style[1].value;
    const saturation = style[2].value;
    const sepia = style[3].value;
    const hue = style[4].value;
    const blur = style[5].value;
    const grayScale = style[6].value;
    const invert = style[7].value;

    const previewImg = document.querySelector('.preview-img');
    

    function save () {

        previewImg.src= src
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = previewImg.clientWidth;
        canvas.height = previewImg.clientHeight;

        ctx.filter = `brightness(${brightness}%) invert(${invert*100}%) grayscale(${grayScale}%) sepia(${sepia}%) contrast(${contrast}%) hue-rotate(${hue*3.4}deg) saturate(${saturation}%) blur(${blur/20}px)`
        ctx.translate(canvas.width/2, canvas.height/2)
        if(rotate !== 0) {
            ctx.rotate((90 * rotate) * (Math.PI / 180));
        }
        ctx.scale(horFlip, verFlip)
        ctx.drawImage(previewImg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = canvas.toDataURL();
        link.click();

    }

    
    return (
       <>
         <img src={src} className="h-80 w-80 md:w-30r md:h-30r lg:w-40r lg:h-40r rounded-lg preview-img"
            style={{filter: `brightness(${brightness}%) saturate(${saturation}%) invert(${invert}) grayscale(${grayScale}%) sepia(${sepia}%) contrast(${contrast}%) hue-rotate(${hue*3.4}deg) blur(${blur/20}px)`,
             transform: `rotate(${90*rotate}deg) scale(${horFlip}, ${verFlip})`}}
        />

        <button onClick={save} className='w-20 h-20 flex justify-center items-center text-2xl bg-indigo-600'>save</button>
       </>
    )
}
