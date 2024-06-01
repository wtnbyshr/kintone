(() => {
  'use strict';
  
  // kintoneのレコード編集画面が表示されたときのイベント
  kintone.events.on('app.record.edit.show', (event) => {
    // ボタンの作成
    const ranksetbtn = document.createElement('button');
    ranksetbtn.textContent = '抽選開始';
    
    // ボタンがクリックされたときの処理
    ranksetbtn.onclick = async function() {
      // KintoneRestAPIClientのインスタンス作成
      const client = new KintoneRestAPIClient();
      // 抽選管理番号を取得するためのクエリ
      const body1 = {
        app: 128,
        query:  '媒介公募番号="' + event.record['媒介公募番号'].value + '" order by 希望申出日時 ',
        fields: ['$id', '抽選管理番号']
      };

      // 抽選管理番号と媒介公募番号順位idを格納するための配列
      const checkOnRecords = [];
      const baikaikouborankid = [];
      
      // 抽選管理番号を取得
      const resp = await client.record.getAllRecordsWithCursor(body1).catch((error) => {
        alert('抽選管理番号の取得に失敗しました。エラー: ' + error.message);
      });

      // 抽選管理番号と媒介公募番号順位idを設定
      for (let i = 0; i < resp.length; i++) {
        checkOnRecords[i] = {
          'id': resp[i].$id.value,
          'record': {'抽選管理番号': {'value': i+1}}
        };
        baikaikouborankid[i] = {
          'id': resp[i].$id.value,
          'record': {'媒介公募番号順位id': {'value':event.record['媒介公募番号'].value + '-' + i+1}}
        };
      }
      
      // 抽選管理番号を更新
      const putrecords = {
        app: 128,
        records: checkOnRecords,baikaikouborankid
      };

      client.record.updateAllRecords(putrecords).then(() => {
        alert('申し込み順に抽選管理番号を一括で付与しました。');
      }).catch((error) => {
        alert('一括付与に失敗しました。エラー: ' + error.message);
      });

      // 抽選者数を集計
      alert('抽選者数を集計をします。');   
      const appId = kintone.app.getRelatedRecordsTargetAppId('媒介公募番号関連レコード一覧');
      const query = '媒介公募番号="' + event.record['媒介公募番号'].value + '" order by 希望申出日時 '; 
      const body2 = {
        'app' : appId,
        'query' : query,
        'totalCount' : true
      };

      const resp2 = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body2).catch((error) => {
        alert('抽選者数の集計に失敗しました。エラー: ' + error.message);
      });
      alert('抽選への参加者数は'+ resp2.totalCount +'事業者です。');
      event.record['抽選者数合計'].value = resp2.totalCount;
      kintone.app.record.set(event);

      // 当選番号を計算
      const nowdate = luxon.DateTime.local().toFormat('yyyy-MM-dd'); 
      alert(' 当選番号計算をします。');
      const body3 = {
        'app' : 128,
        'query' : query
      };
      let sum = 0;
      let tosennum = 0;
      
      const resp3 = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body3).catch((error) => {
        alert('当選番号の計算に失敗しました。エラー: ' + error.message);
      });
      const Baikaikoubonum = event.record['媒介公募番号'].value;
      
      resp3.records.forEach(function(record){
        sum += parseInt(record['合計'].value);
      });
      
      alert('抽選数値の合計は'+ sum +'です。');
      event.record['抽選数値合計'].value = sum;
      
      if (sum - (Math.floor(sum / event.record['抽選者数合計'].value ) * event.record['抽選者数合計'].value) === 0) {
        tosennum =  event.record['抽選者数合計'].value;
      } else {
        tosennum = sum - (Math.floor(sum / event.record['抽選者数合計'].value ) * event.record['抽選者数合計'].value);
      }
      event.record['当選番号計算'].value  = tosennum ;
      event.record['媒介公募番号順位id'].value = Baikaikoubonum + '-' + tosennum;
      event.record['媒介事業者決定日'].value = nowdate;
      kintone.app.record.set(event);
      alert('当選は抽選管理番号'+ tosennum +'番の事業者です。');
      
      // 当選者の情報を取得
      const body4 = {
        'app' : 128,
        'query' : '媒介公募番号順位id="'+ Baikaikoubonum + '-' + tosennum +'"',
      };
      
      alert('媒介公募番号順位id="'+ Baikaikoubonum + '-' + tosennum +'"');
      
      const resp4 = await kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body4).catch((error) => {
      alert('当選者の情報の取得に失敗しました。エラー: ' + error.message);
      });
      alert(resp4.record.宅建事業者名.value);
            
      event.record['媒介登録事業者名称'].value = resp4.record.宅建事業者名.value;
      event.record['媒介決定事業者メールアドレス'].value  = resp4.record.宅建事業者メールアドレス.value;

      alert('当選事業者名は'+  resp4.record.宅建事業者名.value +'です。');
      

    };  
    // ボタンを画面に追加
    kintone.app.record.getHeaderMenuSpaceElement().appendChild(ranksetbtn);
    return event;
  });
})();
