import {useState, forwardRef} from 'react'
import { Dialog, DialogContent, DialogActions, DialogTitle, Slide, Button } from '@mui/material'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
  

export const About = () => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className='absolute top-0 left-0'>
                <button onClick={handleClickOpen} className='txt1 ml-4 mt-2 text-2xl md:text-3xl text-indigo-600'>Photo Boss</button>
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
                        Hello end user, if you are reading this, please do not expect damm! from this app. I don't know much about image processing and it's very hard to apply those bookish theories using javascript only. I learned about image processing in my last semester and the basic idea was that to apply this knowledge into something. I created few preset filters and custom editing options for user and rotate and flip image feature, cropping will be added as future update. Stay happy, Enjoy... 😄
                    </p>
                    <h1 className='txt2 mt-4 font-bold text-xl'>
                        Created by Moinak Majumdar 🥺 with 💩 image processing knowledge.
                    </h1>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
