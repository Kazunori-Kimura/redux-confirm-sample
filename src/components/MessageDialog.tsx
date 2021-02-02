import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores';
import { okMessage, cancelMessage } from '../stores/message';

const MessageDialog: React.FC = () => {
    const message = useSelector((state: RootState) => state.message);
    const dispatch = useDispatch();

    /**
     * キャンセルボタンクリック
     */
    const handleClose = () => {
        dispatch(
            cancelMessage({
                ...message,
            })
        );
    };

    /**
     * OKボタンクリック
     */
    const handleClickOk = () => {
        dispatch(
            okMessage({
                ...message,
            })
        );
    };

    return (
        <Dialog open={message.show ?? false} scroll="paper" onClose={handleClose}>
            <DialogTitle>{message.title}</DialogTitle>
            <DialogContent>
                <DialogContentText component="div">{message.message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                {message.dialogType === 'confirm' && (
                    <>
                        <Button onClick={handleClose}>キャンセル</Button>
                        <Button color="primary" onClick={handleClickOk}>
                            OK
                        </Button>
                    </>
                )}
                {message.dialogType === 'message' && (
                    <Button color="primary" onClick={handleClickOk}>
                        OK
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default MessageDialog;
