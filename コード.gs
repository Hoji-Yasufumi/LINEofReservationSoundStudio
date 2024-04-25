function doPost(e){
  let sheet = SpreadsheetApp.getActive().getActiveSheet();
  sheet.appendRow([new Date(), e.postData.contents]);
  let data = JSON.parse(e.postData.contents); // LINE から来た json データを JavaScript のオブジェクトに変換する
  let events = data.events;
  for(let i = 0; i < events.length; i++){ // すべてのイベントについて繰り返し処理をする
    let event = events[i];
    if(event.type == 'message'){ // メッセージ受信イベントであるか判定
      if(event.message.type == 'text'){ // 受信したのが普通のテキストメッセージであるか
        let translatedText = LanguageApp.translate(event.message.text, 'ja', 'en'); // 英訳して
        sheet.appendRow([new Date(), translatedText]); // スプレッドシートに追記
      }
    }
  }
}

