/* 現在日時入力・フォームブリッジ */
(function() {
  "use strict";
    
    // 初期設定 フィールドコードの設定
    const my_field_code = 'Now_datetime';
  　const date = luxon.DateTime.local();
  
    // フォームから確認画面に移動する前でイベント発火
    fb.events.form.created = [function (state) {

        // 現在の日時を取得しISOを取得
        const currentDatetime = date.toISO();
            
        // フィールドに値を設定
        (function() {
        var textField1 = fb.getElementByCode('媒介公募番号');
        var textField2 = fb.getElementByCode('事業者ID');
        console.log(textField1 & textField2);

        // 取得した要素に初期値を設定します
        textField.getElementsByTagName('媒介公募番号事業者ID')[0].value = textField1 & textField2;

    return state;
  }];
})();
      
        state.record.my_field_code.value = currentDatetime;

      return state; 
       

   }];
})();
