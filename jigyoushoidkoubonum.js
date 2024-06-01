//抽選番号合計計算

(() => {
  
  'use strict';
  
  kintone.events.on('app.record.edit.show', (event) => {
// 現在時刻の設定  
    const date = luxon.DateTime.local();a
// ボタンの設定  
    const ranksetbtn = document.createElement('button');
    ranksetbtn.textContent = '抽選開始';
    
//ボタンを押して集計を開始

    ranksetbtn.onclick = function() {


// 抽選管理番号を関連レコード毎に付与
      const client = new KintoneRestAPIClient();
      const body1 = {
        app: 128,
        query:  '媒介公募番号="' + event.record['媒介公募番号'].value + '" order by 希望申出日時 ',
        fields: ['$id', '抽選管理番号']
    };

      const checkOnRecords = [];
      var i = 0;

      client.record.getAllRecordsWithCursor(body1).then((resp) => {

        // レコードの数でループ
        for (let i = 0; i < resp.length; i++) {
          checkOnRecords[i] = {
            'id': resp[i].$id.value,
            'record': {
              '抽選管理番号': {
                'value': i+1
              }
            }
          };
        }
        const putrecords = {
          app: 128,
          records: checkOnRecords
        };

        client.record.updateAllRecords(putrecords).then(() => {
          alert('申し込み順に抽選管理番号を一括で付与しました。');
          location.reload();
        }).catch((error) => {
          alert('一括付与に失敗しました。');
        });
    });
    
//抽選者数合計計算
            alert('抽選者数を集計をします。');   
            const appId = kintone.app.getRelatedRecordsTargetAppId('媒介公募番号関連レコード一覧');
            const query = '媒介公募番号="' + event.record['媒介公募番号'].value + '" order by 希望申出日時 '; 
            const body2 = {
                            'app' : appId,
                            'query' : query,
                            'totalCount' : true
                            };
            kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body2, function(resp) {
            
            alert('抽選への参加者数は'+ resp.totalCount +'事業者です。');
            
            event.record['抽選者数合計'].value = resp.totalCount;
            
            kintone.app.record.set(event);
            });

  
//抽選数値合計 当選番号計算 
            alert(' 当選番号計算をします。');   
            
            kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body2, function(resp) {
                let sum = 0;
                let Tosennum = 0;
                const Baikaikoubonum = event.record['媒介公募番号'].value;
                
                for (let i = 0; i < resp.records.length; i++) {
                sum += resp.records[i].合計.value;
                }
                
                resp.records.forEach(function(record){
                sum += record['合計'].value ? parseInt(record['合計'].value) : 0;
                });
                event.record['抽選数値合計'].value = sum;
                
                if (sum - (sum / event.record['抽選者数合計'].value ) * event.record['抽選者数合計'].value === 0) {
                tosennum = event.record['抽選者数合計'].value;
                 } else {
                tosennum = sum - (sum / event.record['抽選者数合計'].value ) * event.record['抽選者数合計'].value;
                }
                event.record['当選番号計算'].value  = Tosennum ;
                event.record['媒介公募番号順位id'].value = Baikaikoubonum + '-' + tosennum;
                alert('当選は抽選管理番号'+ event.record['当選番号計算'].value +'番の事業者です。');
                kintone.app.record.set(event);
                });

//媒介登録事業者名称の登録
            alert('媒介登録事業者名称の登録をシステムに登録します。');
            const body4 = {
                        'app' : appId,
                        'query' : '抽選管理番号=' + event.record['当選番号計算'].value,
                          };
           
            kintone.api(kintone.api.url('/k/v1/record.json', true), 'GET', body4, function(resp) {
              
                
                const baikaiketteidate = date.toFormat('yyyy-MM-dd');

                event.record['媒介登録事業者名称'].value = resp.record.宅建事業者名.value;
                event.record['媒介決定事業者メールアドレス'].value  =resp.record.宅建事業者メールアドレス.value;
                event.record['媒介事業者決定日'].value = baikaiketteidate;
                
                alert('当選事業者名は'+  resp.record.宅建事業者名.value +'です。');
                
                kintone.app.record.set(event);
                });

        };  
  
  
        // ボタン設置
        kintone.app.record.getHeaderMenuSpaceElement().appendChild(ranksetbtn);
 
      return event;

    });
})();
