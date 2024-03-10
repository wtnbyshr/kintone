/* 現在日時入力ボタン */
(function() {
    'use strict';
    // 初期設定 フィールドコードとボタンのスペースIDの設定
    const my_field_code = 'Now_datetime';
    const my_space_ID = 'button_space';

    // 新規登録と編集画面でイベント発火
    const events = [
        'app.record.create.show',
        'app.record.edit.show'
    ];
    kintone.events.on(events, function(event) {
        const record = event.record;

        // ボタンの作成
        const startButton = document.createElement('button');
        startButton.innerText = '打刻ボタン';
        startButton.onclick = function() {
        // 現在の日時を取得
        const currentDatetime = new Date().toISOString();

        // レコードの取得
        let obj = kintone.app.record.get();
            
        // フィールドに値を設定
        obj.record[my_field_code].value = currentDatetime;
            
        // レコードの更新
        kintone.app.record.set(obj);
        };
        
        // ボタンをフォームに追加
        kintone.app.record.getSpaceElement(my_space_ID).appendChild(startButton);
        return event;
    });
})();
