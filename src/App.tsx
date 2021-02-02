import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from '@material-ui/core';
import MessageDialog from './components/MessageDialog';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './stores';
import { showMessage } from './stores/message';

const DIALOG_ID = 'sample';

const App: React.FC = () => {
    const [display, setDisplay] = useState(false);

    const dispatch = useDispatch();
    const message = useSelector((state: RootState) => state.message);

    const handleClick = () => {
        dispatch(
            showMessage({
                dialogId: DIALOG_ID,
                title: 'test',
                message: '確認してください',
                dialogType: 'confirm',
            })
        );
    };

    useEffect(() => {
        if (
            message.dialogId === DIALOG_ID &&
            message.clicked &&
            message.clicked[DIALOG_ID] === 'ok'
        ) {
            // OKが押された
            setDisplay(true);
        }
    }, [message.clicked, message.dialogId]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <br />
                <Button variant="contained" color="primary" onClick={handleClick}>
                    Confirm表示
                </Button>

                {display && <p>OKが押された</p>}
            </header>

            <MessageDialog />
        </div>
    );
};

export default App;
