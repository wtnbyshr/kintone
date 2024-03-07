/*  現在日時入力ボタン   */
(function() {
    'use strict';

    // 初期設定　フィールドコードとボタンのスペースIDの設定
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
            const currentDatetime = new Date().toISOString();
            record[my_field_code].value = currentDatetime;
            kintone.app.record.set(event);
        };

        // ボタンをフォームに追加
        kintone.app.record.getSpaceElement(my_space_ID).appendChild(startButton);

        return event;
    });
})();
