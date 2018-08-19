// Modules to control application life and create native browser window
const {app, Menu, Tray, BrowserWindow, globalShortcut, dialog} = require('electron')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {

  tray = new Tray('images/bigsmoke.ico')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Open', click: function(){
      dialog.showMessageBox({
        message:'Test keybinder'
      })
    }},
    {label: 'Close', click: function(){
     app.quitting = true;
     app.quit();
    }},
  ])
  tray.setToolTip('them4 samp keybinder')
  tray.setContextMenu(contextMenu)
  
  const fs = require("fs");

  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('settings/input.txt')
  });

  lineReader.on('line', function (line) {
     let robot = require('robotjs');
     var data = line.split(",");
     globalShortcut.register(data[0], () => {
      robot.typeString('t');
      robot.typeString(data[1].trim());
      robot.keyTap("enter");
    })
  
  });
  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    if(app.quitting){
      app.quit()
    }
   
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

