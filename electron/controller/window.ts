import { handle, on } from '../decorator/ipc'
import { getMainWindow } from '../main/window'

export default class ConfigController {

  /**
   * 顶部操作-最小化窗口
   * @param event
   * @param skipTaskBar 不在程序栏中显示
   */
  @on
  static async handMinWindow({ skipTaskBar }:any) {
    const mainWindow = getMainWindow();
    console.log(skipTaskBar)
    if (mainWindow) {
      if (skipTaskBar) {
        mainWindow.hide();
        mainWindow.setSkipTaskbar(true);
      } else {
        mainWindow.minimize();
      }
    }
  }
}
