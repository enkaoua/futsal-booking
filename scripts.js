// step 1

/* var wbook = SpreadsheetApp.openByURL(url);
var sheet = wbook.getSheetByName("Sheet1");

// step 2

function doPost(e) {
  var action = e.parameters.action;
  var name = e.parameters.name;

  if (action == "addUser") {
    return addUser(e);
  }
}

// step 3

function addUser(e) {
  var user = JSON.parse(e.postData.contents);
  sheet.appendRow([user.name, user.age, user.email]);

  return ContentServer.createTextOutput("Success").setMimeType(
    ContentService.setMimeType.TEXT
  );
}
 */
