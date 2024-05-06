(function() {
  'use strict';
    const events = [
    'app.record.edit.show','app.record.detail.show'
    ];
    kintone.events.on(events, (event) => {
  
    //追加したいスペースを指定して、nullチェック(増殖バグ防止)
    if (document.getElementById('map') !== null) {
    return;
    }

  　//一覧画面のヘッダ部の要素を取得
    let mapSpace = kintone.app.record.getSpaceElement('map');
    $(mapSpace).append('<div id="map" style="width:800px; height:400px"></div>');
    
    // 緯度経度値取得
    
    const body = {
      app: kintone.app.getId(),
      id: kintone.app.record.getId()
    };

    kintone.api(
      kintone.api.url('/k/v1/record', true), // pathOrUrl
      'GET', // method
      body, // params
      (resp) => { 
        
      //緯度と経度をを渡して、マップを表示  
      const mySpaceField = kintone.app.record.getSpaceElement('latlong');
      mySpaceField.parentNode.style.width = '400px';
      
        const reclat= event.record['緯度'].value;
        const reclon= event.record['経度'].value;
       kintone.app.record.getSpaceElement('latlong').innerText =reclat + '/' + reclon;
       
    　 setMarkerAndShowMap(mapSpace, reclat, reclon);
      }
    );
      
    });
  })();

  // マーカーをセットして、マップを表示
  function setMarkerAndShowMap(spaceElement,currentLat,currentLng) {
   let map = new ol.Map({
              target: 'map',
              layers: [
                  new ol.layer.Tile({
                      source: new ol.source.OSM()
                  })
              ],
              view: new ol.View({
                  zoom: 18
              })
          });
    //経度と緯度を変換
    let coordinate = convertCoordinate(currentLng, currentLat);

    //マーカーの作成
    let marker = makeMarkerOverlay(coordinate);

　　//マップにマーカを追加する
    map.addOverlay(marker);

　　// 緯度経度を球面メルカトル図法に変換
    let latestCoordinate = convertCoordinate(currentLng,currentLat);

    //指定した位置をマップの中央にセット
    map.getView().setCenter(latestCoordinate);
  }

　// マーカーを表示するレイヤーを作成
  function makeMarkerOverlay(coordinate) {
      let imgElement = document.createElement('img');
      let imgSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAZCAYAAADe1WXtAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHwSURBVEiJpdW9a9NRFMbxT9qmNWmSRqlFhE6CLuIL1DcUHDqJm/0HBEUk3RQXpW7dXdysWlAEHQSlo4IoIohQKFJQxKWIIlTb5pc2anMdkmBbmleHZ3vul3Pvc865QggaCfu6uIOtTfkbGboYTRIN8yvJd5xoG4psmqk9LH0gBMJTQh+FJOPobAmKo718zbFcrACr+kI4TpThHQYbQhHr4WqG6MkG2FqtEsb5nWQJZ2pCMZDh5RBLc3WAa/WGsIMozV0k1kExnGR+jOKfJoFVLRBGKKT4jL0hBLq51kfhRZ2D04Qblfes5blNKcFynItwYTf5Ug3zc0KyolSlslrgIQpxxiCWYWaC0mbGUUIHASFDeFwD+Kjcbh/RWX3Tw1mixTYrzRP6iXBsXfppHl6m2M6bXqLYx4PNWmpnguhTi+m/L99iEf2bNn8P108RtQI9Qj5Ort5Ebenl27MmgfcoZZhFR93Zx8gu8o2GYIGQLYdzqKmFkuHtTVbrQXOsZJhsZUvtT1P4UQM4/S+cbS3t0xSTOVY2AkuEA+Q7Od/Okt6eID+7ATpRDmcGsba+k26unCRfBc6XRzXCwba+k0q18RRzUxXoOZZT3Kp3piG0Aj49SP41IcFPZP8bWmmxVwOsxDjbjL8pKPZ3c79eOGv1F5xHWAKxXNwiAAAAAElFTkSuQmCC';
      imgElement.setAttribute('src', imgSrc);

      let markerOverlay = new ol.Overlay({
          element: imgElement,
          position: coordinate,
          positioning: 'center-center'
      });

      return markerOverlay;
  }

  // 緯度経度を球面メルカトル図法に変換
　function convertCoordinate(longitude, latitude) {
 　   return ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857');
　}
