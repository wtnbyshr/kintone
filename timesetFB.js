(function() {
  "use strict";

  // 初期設定 フィールドコードの設定
  const date = luxon.DateTime.local();
  
  // フォームから確認画面に移動する前でイベント発火
  fb.events.form.mounted = [function (state) {
    // 現在の日時を取得しISOを取得
    const currentDatetime = date.toISO();
    const currentDatetimemill = currentDatetime.substring(21,23);

    // フィールドに値を設定
    state.record.Now_datetime.value = currentDatetime;
    state.record.timest3.value = currentDatetimemill;
    
    return state;
  }];
})();
