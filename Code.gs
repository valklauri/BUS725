function getPrediction(value) {
  var url = 'https://0okrm2lu3j.execute-api.us-east-1.amazonaws.com/default/presidentpredictor?text=' + value;
  var options = {
     "method" : "GET",
     "headers" : {
       "x-api-key" : "xxx", //very secret
     }
   };
  return JSON.parse(UrlFetchApp.fetch(url, options).getContentText());
}

function myOnEdit(e) {
  var range = e.range;
  var column = range.getColumn();
  if (column == 1) {
    var row = range.getRow();
    var prediction = getPrediction(e.value);
    SpreadsheetApp.getActiveSheet().getRange('B' + row).setValue(prediction.predictedPresident);
    SpreadsheetApp.getActiveSheet().getRange('C' + row).setValue(prediction.predictedScore);
  }
}
