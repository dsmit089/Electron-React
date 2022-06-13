const path = require('path');
const url = require('url');
const { ipcRenderer } = require('electron')
const customTitlebar = require('custom-electron-titlebar');
window.ipcRenderer = require('electron').ipcRenderer;



window.addEventListener('DOMContentLoaded', () => {
  console.log(__dirname);

  const d = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#2f3241'),
    icon: url.format(path.join(__dirname, '/images', '/icon.png')),
    minimizable:false
  });

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
    console.log('call');
    //ipcRenderer.send('anaction', 'test')
  //
  ipcRenderer.on('Update-Menu',() =>{
    d.refreshMenu()
  })
  
})


