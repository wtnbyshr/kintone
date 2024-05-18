(function() {
  "use strict";

  // 初期設定 フィールドコードの設定

  const baikainum = state.record.媒介公募番号.value

  // フォームから確認画面に移動する前でイベント発火
  fb.events.form.mounted = [function (state) {
    // 現在の日時を取得しISOを取得
    const currentDatetime = date.toISO();

    // フィールドに値を設定
    state.record.Now_datetime.value = currentDatetime;
    
    return state;
  }];
})();
