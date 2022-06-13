const { app, Menu, shell } = require('electron');
  
  

const TestFuncation = () =>
{
    console.log('TestFuncation');
}

const buildMenu = (data) =>
   {
    //console.log(data);
      // if (
      //   process.env.NODE_ENV === 'development' ||
      //   process.env.DEBUG_PROD === 'true'
      // ) {
      //   setupDevelopmentEnvironment();
      // }
  
      // const template =
      //   process.platform === 'darwin'
      //     ? buildDarwinTemplate()
      //     : buildDefaultTemplate();
  
      //     console.log(template);
      const menu = Menu.buildFromTemplate(buildDefaultTemplate());
      Menu.setApplicationMenu(menu);
  
      return menu;
    }

  
   const setupDevelopmentEnvironment = () => {
      this.mainWindow.webContents.on('context-menu', (_, props) => {
        const { x, y } = props;
  
        Menu.buildFromTemplate([
          {
            label: 'Inspect element',
            click: () => {
              this.mainWindow.webContents.inspectElement(x, y);
            },
          },
        ]).popup({ window: this.mainWindow });
      });
    }
  
   const buildDarwinTemplate = () => {
      const subMenuAbout = {
        label: 'Electron',
        submenu: [
          {
            label: 'About ElectronReact',
            selector: 'orderFrontStandardAboutPanel:',
          },
          { type: 'separator' },
          { label: 'Services', submenu: [] },
          { type: 'separator' },
          {
            label: 'Hide ElectronReact',
            accelerator: 'Command+H',
            selector: 'hide:',
          },
          {
            label: 'Hide Others',
            accelerator: 'Command+Shift+H',
            selector: 'hideOtherApplications:',
          },
          { label: 'Show All', selector: 'unhideAllApplications:' },
          { type: 'separator' },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: () => {
              app.quit();
            },
          },
        ],
      };
      const subMenuEdit = {
        label: 'Edit',
        submenu: [
          { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
          { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
          { type: 'separator' },
          { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
          { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
          { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
          {
            label: 'Select All',
            accelerator: 'Command+A',
            selector: 'selectAll:',
          },
        ],
      };
      const subMenuViewDev = {
        label: 'View',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'Command+R',
            click: () => {
              this.mainWindow.webContents.reload();
            },
          },
          {
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+Command+F',
            click: () => {
              this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
            },
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: 'Alt+Command+I',
            click: () => {
              this.mainWindow.webContents.toggleDevTools();
            },
          },
        ],
      };
      const subMenuViewProd = {
        label: 'View',
        submenu: [
          {
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+Command+F',
            click: () => {
              this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
            },
          },
        ],
      };
      const subMenuWindow = {
        label: 'Window',
        submenu: [
          {
            label: 'Minimize',
            accelerator: 'Command+M',
            selector: 'performMiniaturize:',
          },
          { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
          { type: 'separator' },
          { label: 'Bring All to Front', selector: 'arrangeInFront:' },
        ],
      };
      const subMenuHelp = {
        label: 'Help',
        submenu: [
          {
            label: 'Learn More',
            click() {
              shell.openExternal('https://electronjs.org');
            },
          },
          {
            label: 'Documentation',
            click() {
              shell.openExternal(
                'https://github.com/electron/electron/tree/main/docs#readme'
              );
            },
          },
          {
            label: 'Community Discussions',
            click() {
              shell.openExternal('https://www.electronjs.org/community');
            },
          },
          {
            label: 'Search Issues',
            click() {
              shell.openExternal('https://github.com/electron/electron/issues');
            },
          },
        ],
      };
  
      const subMenuView =
        process.env.NODE_ENV === 'development' ||
        process.env.DEBUG_PROD === 'true'
          ? subMenuViewDev
          : subMenuViewProd;
  
      return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
    }
  
  const buildDefaultTemplate = () => {
      const templateDefault = [
        {
          label: '&File',
          submenu: [
            {
              label: '&Open',
              accelerator: 'Ctrl+O',
            },
            {
              label: '&Close',
              accelerator: 'Ctrl+W',
              click: () => {
                this.mainWindow.close();
              },
            },
          ],
        },
        {
          label: '&View',
          submenu:
            process.env.NODE_ENV === 'development' ||
            process.env.DEBUG_PROD === 'true'
              ? [
                  {
                    label: '&Reload',
                    accelerator: 'Ctrl+R',
                    click: () => {
                      this.mainWindow.webContents.reload();
                    },
                  },
                  {
                    label: 'Toggle &Full Screen',
                    accelerator: 'F11',
                    click: () => {
                      this.mainWindow.setFullScreen(
                        !this.mainWindow.isFullScreen()
                      );
                    },
                  },
                  {
                    label: 'Toggle &Developer Tools',
                    accelerator: 'Alt+Ctrl+I',
                    click: () => {
                      this.mainWindow.webContents.toggleDevTools();
                    },
                  },
                ]
              : [
                  {
                    label: 'Toggle &Full Screen',
                    accelerator: 'F11',
                    click: () => {
                      this.mainWindow.setFullScreen(
                        !this.mainWindow.isFullScreen()
                      );
                    },
                  },
                ],
        },
        {
          label: 'Help',
          submenu: [
            {
              label: 'Learn More',
              click() {
                shell.openExternal('https://electronjs.org');
              },
            },
            {
              label: 'Documentation',
              click() {
                shell.openExternal(
                  'https://github.com/electron/electron/tree/main/docs#readme'
                );
              },
            },
            {
              label: 'Community Discussions',
              click() {
                shell.openExternal('https://www.electronjs.org/community');
              },
            },
            {
              label: 'Search Issues',
              click() {
                shell.openExternal('https://github.com/electron/electron/issues');
              },
            },
          ],
        },
      ];
  
      return templateDefault;
    }
  
  module.exports = {
    buildMenu,
    TestFuncation,
    buildDarwinTemplate,
    buildDefaultTemplate
  }

  