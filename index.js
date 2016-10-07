var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var Realm = require('realm');

var Book = {name: 'Book', properties: {
  id: {type: 'int', optional: false},
  title: {type: 'string', optional: true}
}};

var db = new Realm({schema: [Book]});

var book = db.objects('Book');
db.write(()=>{
  var bid = book[book.length-1].id || 0 ;
  db.create('Book', {id: bid+1, title: "Hello"});
});

console.log(db.objects('Book'));

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
