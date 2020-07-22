import { sleep } from './utils.js';

export default class Bulb {
  constructor(device) {
    this.device = device.lightList[0];
  }

  async setColor(color, transitionTime) {
    await this.device.setColor(color, transitionTime);

    if (transitionTime) {
      await sleep(transitionTime*1000);
    }
  }

  async setBrightness(brightness, transitionTime) {
    await this.device.setBrightness(brightness, transitionTime);

    if (transitionTime) {
      await sleep(transitionTime*1000);
    }
  }

  async toggle(value) {
    await this.device.toggle(value);
  }
}
