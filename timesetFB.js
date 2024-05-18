/* 現在日時入力・フォームブリッジ */
(function() {
  "use strict";
    
    // 初期設定 フィールドコードの設定
    const my_field_code = 'Now_datetime';
  
    // フォームから確認画面に移動する前でイベント発火
    fb.events.form.confirm = [function (state) {

        // 現在の日時を取得
        const currentDatetime = new Date().toISOString();
            
        // フィールドに値を設定
        state.my_field_code.value = currentDatetime;
       

   }];
})();
