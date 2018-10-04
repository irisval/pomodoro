// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')

let firstWindow
let secondWindow

function createWindow () {

  firstWindow = new BrowserWindow({width: 1281, height: 800})

  firstWindow.loadFile('index.html')

  firstWindow.webContents.openDevTools()

  firstWindow.on('closed', function () {
    firstWindow = null
  })

  // secondWindow = new BrowserWindow({width: 800, height: 600})

  // secondWindow.loadFile('w2.html')

  // secondWindow.webContents.openDevTools()

  // secondWindow.on('closed', function () {
  //   secondWindow = null
  // })
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
    if (firstWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific first process
// code. You can also put them in separate files and require them here.
