import React from 'react'
import { Dialog, DialogContent, DialogActions, DialogTitle, Slide, Button } from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
  

export const About = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className='absolute top-0 left-0'>
                <button onClick={handleClickOpen} className='txt1 ml-4 mt-2 text-3xl text-indigo-600'>Photo Boss</button>
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <span className='txt1 text-2xl text-indigo-500'>This is Photo Boss</span>
                </DialogTitle>
                <DialogContent>
                    <p className='txt4 text-lg'>
                        Basic photo editor but, 
                        <br/>better than adobe photoshop 🤛
                    </p>
                    <h1 className='txt2 mt-4 font-bold text-xl'>
                        Created by Moinak Majumdar 🥺 with 0 image processing knowledge.
                    </h1>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
