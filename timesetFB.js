(function() {
  "use strict";

  // 初期設定 フィールドコードの設定
  const date = luxon.DateTime.local();
  
  // フォームから確認画面に移動する前でイベント発火
  fb.events.form.mounted = [function (state) {
    // 現在の日時を取得しISOを取得
    const currentDatetime = date.toISO();
    const currentDatetimemill = luxon.DateTime.fromISO('2023-10-01T00:00:00.000+09:00').toFormat('SSS');;

    // フィールドに値を設定
    state.record.Now_datetime.value = currentDatetime;
    state.record.timest3.value = currentDatetimemill;
    
    return state;
  }];
})();
