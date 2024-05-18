(function() {
  "use strict";

  fb.events.form.created = [function (state) {
    console.log(state);
      const baikainum = state.record.媒介公募番号.value
      const jigyoushaid = state.record.事業者ID.value
    
    state.record.媒介公募番号事業者ID.value = baikainum + jigyoushaid

    return state;  // 変更後の状態を返さない場合、一部の変更が反映されない場合があります
  }];
})();
