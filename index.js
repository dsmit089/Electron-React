const { app, BrowserWindow,Menu,ipcMain } = require('electron')
const path = require('path')
const {TestFuncation,buildMenu,buildDefaultTemplate,buildDarwinTemplate } = require('./Menu')

const { setupTitlebar} = require('custom-electron-titlebar/main');

setupTitlebar();

function createWindow () {
  // Create the browser window.
  
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame:false,
    icon: path.join(__dirname + "images/icon.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('anaction', (e,data) => 
  {
    console.log(data);
    const menu = Menu.buildFromTemplate(buildDarwinTemplate());
    Menu.setApplicationMenu(menu);
    win.webContents.send('Update-Menu');
  });

  //load the index.html from a url
  //win.loadURL(`file://${path.join(__dirname, '../botiga-ui/build/index.html')}`);
  win.loadURL(`file://${path.join(__dirname, './dist/index.html')}`);

  // Open the DevTools.
  //win.webContents.openDevTools()

  
  
}

// const menu = Menu.buildFromTemplate(template)
// Menu.setApplicationMenu(menu)





// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.