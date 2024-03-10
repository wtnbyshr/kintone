/* 現在日時のミリ秒部分をtimestamp3textに代入 */
(function() {
    'use strict';
    // 初期設定 
    const my_timest_3text = 'timestamp3text';

    // 新規登録と編集登録でイベント発火

    const events = [
        'app.record.create.submit',
        'app.record.edit.submit'
    ];
    kintone.events.on(events, function(event) {
        const record = event.record;

        // 現在の日時を取得
        const currentDatetime = record['Now_datetime'].value;
        // ミリ秒を抽出
        var extractedString = currentDatetime.substring(19, 23);
        // レコードの取得
        let obj = kintone.app.record.get();
        // フィールドに値を設定
        obj.record[my_timest_3text].value = extractedString;
        // レコードの更新
        kintone.app.record.set(obj);
        
        
        return event;
    });
})();
