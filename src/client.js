import nodeTradfriClient from 'node-tradfri-client';
import { sleep } from './utils.js';
import Bulb from './bulb.js';

const { discoverGateway, TradfriClient, AccessoryTypes } = nodeTradfriClient;

const lightbulbs = {};
const deviceUpdated = (device) => {
  if (device.type === AccessoryTypes.lightbulb) { 
    lightbulbs[device.instanceId] = device;
  }
};

const getLightbulb = (index) => {
  const keys = Object.keys(lightbulbs);
  if (keys.length < index + 1) {
    console.error(`Index out of range. Index ${index}, array length: ${keys.length}`);
    return;
  }

  const device = lightbulbs[keys[index]];
  if (!device) {
    console.error(`No device found for key: ${keys[index]}`);
    return;
  }

  return new Bulb(device);
};

const setup = async () => {
  const result = await discoverGateway();
  const tradfri = new TradfriClient(result.name);
  const {identity, psk} = await tradfri.authenticate(process.env.SECURITY_CODE);
  await tradfri.connect(identity, psk); // TODO: save identity and psk and load from memory
  
  tradfri
    .on("device updated", deviceUpdated)
    .observeDevices();
    
  await sleep(500);

  return tradfri;
}

export default {
  setup,
  getLightbulb
};
