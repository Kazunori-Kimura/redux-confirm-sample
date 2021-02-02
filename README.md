# Redux の confirm 実装サンプル

redux を使ってメッセージダイアログで OK ボタンが押されたら任意の処理を実行するサンプルです

https://github.com/Kazunori-Kimura/redux-confirm-sample

## action の定義

-   `showMessage`: 確認メッセージを表示する
-   `okMessage`: OK ボタンをクリック
-   `cancelMessage`: キャンセルあるいはダイアログ外をクリック

## store の定義

```ts
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
```

## 処理の流れ

`App` コンポーネントから `MessageDialog` コンポーネントを呼び出し、`OK`ボタンが押されたかどうかを呼び出し元コンポーネントに返します

1. 「confirm 表示」ボタンをクリックすると `showMessage` を dispatch して確認メッセージを表示
2. OK ボタンをクリックすると `clicked[dialogId] = 'ok'` をセット
3. `useEffect` にて `clicked[dialogId]` の値が変わったかどうかをチェック、`ok` になったら任意の処理を実行
