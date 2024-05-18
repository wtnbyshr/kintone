(function() {
  "use strict";

  // 初期設定 フィールドコードの設定
  const date = luxon.DateTime.local();
  const jigyoushaid = state.record.事業者ID.value
  const baikainum = state.record.媒介公募番号.value

  // フォームから確認画面に移動する前でイベント発火
  fb.events.form.mounted = [function (state) {
    // 現在の日時を取得しISOを取得
    const currentDatetime = date.toISO();

    // フィールドに値を設定
    state.record.Now_datetime.value = currentDatetime;
    state.record.媒介公募番号事業者ID.value = baikainum + jigyoushaid
    return state;
  }];
})();
