import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DialogType = 'confirm' | 'message';
export type ClickedButton = 'ok' | 'cancel';

/**
 * メッセージダイアログのstore
 */
export interface MessageStateAttributes {
    dialogId?: string;
    title: string;
    message: string;
    dialogType: DialogType;
    show?: boolean;
    // dialogId ごとにクリックされたボタンを保持
    clicked?: Record<string, ClickedButton | undefined>;
}

/**
 * 初期値
 */
const initialState: MessageStateAttributes = {
    title: 'メッセージ',
    message: '',
    dialogType: 'message',
    clicked: {},
};

const slice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        /**
         * メッセージダイアログを表示する
         */
        showMessage: (
            state: MessageStateAttributes,
            action: PayloadAction<MessageStateAttributes>
        ) => {
            const { dialogId } = action.payload;
            const clicked = { ...state.clicked };

            if (dialogId) {
                // 押されたボタンの状態を初期化
                // 注意！ おなじダイアログが複数同時に表示されることを考慮していません
                clicked[dialogId] = undefined;
            }

            return {
                ...state,
                ...action.payload,
                // メッセージダイアログを表示
                show: true,
                clicked,
            };
        },
        /**
         * okボタンのクリック
         */
        okMessage: (
            state: MessageStateAttributes,
            action: PayloadAction<MessageStateAttributes>
        ) => {
            const { dialogId } = action.payload;
            const clicked = { ...state.clicked };

            if (dialogId) {
                // 押されたボタンをセット
                clicked[dialogId] = 'ok';
            }

            return {
                ...state,
                ...action.payload,
                // メッセージダイアログを閉じる
                show: false,
                clicked,
            };
        },
        /**
         * キャンセルボタンのクリック
         */
        cancelMessage: (
            state: MessageStateAttributes,
            action: PayloadAction<MessageStateAttributes>
        ) => {
            const { dialogId } = action.payload;
            const clicked = { ...state.clicked };

            if (dialogId) {
                // 押されたボタンをセット
                clicked[dialogId] = 'cancel';
            }

            return {
                ...state,
                ...action.payload,
                // メッセージダイアログを閉じる
                show: false,
                clicked,
            };
        },
    },
});

export const { showMessage, okMessage, cancelMessage } = slice.actions;
export default slice;
