import dotenv from 'dotenv';
import client from './src/client.js';
import { sleep } from './src/utils.js';

dotenv.config(); // read local .env configs

const colors = ['8f00ff','4B0082','0000ff','00ff00','ffff00','ff7f00','ff0000'];
const timeForTransition = 3; // seconds

async function main() {
  try {
    const tradfri = await client.setup();
    const bulb = client.getLightbulb(0);

    await bulb.toggle(true);
    await bulb.setBrightness(100);

    for (const color of colors) {
      console.log(`Setting color: #${color}`)
      await bulb.setColor(color, timeForTransition);
    }

    sleep(500);

    tradfri.destroy();
  }
  catch (e) {
    console.log(e.code);
    console.error(e);
  }
}

Promise.all([main()]);
