import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import ViewIcon from '@mui/icons-material/RemoveRedEye';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { usePopupState } from 'material-ui-popup-state/hooks';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormControl,
    FormLabel,
    TextField,
    Typography,
    Box,
    Modal,
    MenuItem, Menu
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Card({ card, listId, deleteTask, updateTaskStatus }) {
    const [openTaskDetail, setOpenTaskDetail] = useState(false);
    const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });

    const handleOpen = () => {
        setOpenTaskDetail(true);
    };

    const handleClose = () => {
        setOpenTaskDetail(false);
    };

    const updateStatus = (status) => {
        updateTaskStatus(listId, card.id, status);
    };

    return (
        <div className="card">
            <p>{card.name}</p>
            <p>{card.description}</p>
            {/* <div>
                <Button variant="contained" {...bindTrigger(popupState)}>
                    Open Menu
                </Button>
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={() => updateStatus()}>Cake</MenuItem>
                    <MenuItem onClick={popupState.close}>Death</MenuItem>
                </Menu>
            </div> */}

            <div>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <React.Fragment>
                            <Button variant="primary" {...bindTrigger(popupState)}>
                                Status: {card.status}
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={() => { updateStatus('To-Do'); popupState.close(); }}>To-Do</MenuItem>
                                <MenuItem onClick={() => { updateStatus('In-Progress'); popupState.close(); }}>In-Progress</MenuItem>
                                <MenuItem onClick={() => { updateStatus('Completed'); popupState.close(); }}>Completed</MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            </div>

            {card.image && <img src={card.image} alt="attached" />}
            <span onClick={() => deleteTask(card.id, listId)}><DeleteIcon /></span>
            <span onClick={() => setOpenTaskDetail(true)}><ViewIcon /></span>

            <Modal
                open={openTaskDetail}
                onClose={handleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        View Task
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {card.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {card.description}
                    </Typography>
                    <br /><br />
                    <Button variant="contained" color="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default Card;
