//抽選番号合計計算

(() => {
  'use strict';

  const events = [
    'app.record.detail.show',
    'app.record.edit.show'
  ];
  kintone.events.on(events, (event) => {
    
    const appId = kintone.app.getRelatedRecordsTargetAppId("タイムスタンプ検証");
    const query = '物件名="' + event.record['抽選物件名'].value + '" order by Now_datetime1 '; 
    const body = {
      'app' : appId,
      'query' : query
    };
    kintone.api(kintone.api.url('/k/v1/records', true), 'GET', body, function(resp) {
      var sum = 0;
      resp.records.forEach((record)=>{
        sum += record['合計'].value ? parseInt(record['合計'].value) : 0;
      });
       event.record['抽選数値合計'].value = sum;
       kintone.app.record.set(event);
    });
    
    return event;
  });  
  
})();

//抽選者数合計計算

(() => {
  'use strict';

  const events = [
    'app.record.detail.show',
    'app.record.edit.show'
  ];
  kintone.events.on(events, (event) => {
    
    const appId = kintone.app.getRelatedRecordsTargetAppId("タイムスタンプ検証");
    const query = '物件名="' + event.record['抽選物件名'].value + '"'; 
    const paramGET = {
      'app' : appId,
      'query' : query,
      'totalCount' : true
    };
    kintone.api(kintone.api.url('/k/v1/records', true), 'GET', paramGET, (resp)=> {
      event.record['抽選者数合計'].value = resp.totalCount;
      kintone.app.record.set(event);
    });
    return event;
  });
})();
