(function() {
  "use strict";

  fb.events.form.created = [function (state) {
    console.log(state);
      const date = luxon.DateTime.local();
      const jigyoushaid = state.record.事業者ID.value
    
    state.record.string1.value = 'edit string data';

    return state;  // 変更後の状態を返さない場合、一部の変更が反映されない場合があります
  }];
})();
