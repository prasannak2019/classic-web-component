import { DEVICE } from '../entities/device';

class BrowserService {

  public static getDevice(): DEVICE {
    if (navigator.platform.match(/iPhone|iPod|iPad/)) {
      return DEVICE.IOS;    
    }
    else if (navigator.platform.toLowerCase() === 'android') {
      return DEVICE.ANDROID;
    }
  }
}
export default BrowserService;
