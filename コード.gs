function doPost(e){
  let data = JSON.parse(e.postData.contents); // LINE から来た json データを JavaScript のオブジェクトに変換する
  let events = data.events;
  for(let i = 0; i < events.length; i++){
    let event = events[i];
    if(event.type == 'message'){
      if(event.message.type == 'text'){ // 受信したのが普通のテキストメッセージだったとき
        let translatedText = LanguageApp.translate(event.message.text, 'ja', 'en');
        // 送信するデータをオブジェクトとして作成する
        let contents = {
          replyToken: event.replyToken, // event.replyToken は受信したメッセージに含まれる応答トークン
          messages: [{ type: 'text', text:  translatedText }],
        };
        reply(contents); // 下で説明
      }
    }
  }
}

function reply(contents){
  let channelAccessToken = "U6wq3o2CRvItM+Q4acoe8nm6oA5QvkimkNkTlOSZbXOiaKsXa9OnZc9Uyj8NDadOi/jOWGt9rwpJtIXppzxuedcRF3Myga+0SqfW/qpoVlCG1d/xGiv0tBSqapALni8Qd38QCL0itFY13BmtmhbkrAdB04t89/1O/w1cDnyilFU=";
  let replyUrl = "https://api.line.me/v2/bot/message/reply"; // LINE にデータを送り返すときに使う URL
  let options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + channelAccessToken
    },
    payload: JSON.stringify(contents) // リクエストボディは payload に入れる
  };
  UrlFetchApp.fetch(replyUrl, options);
}