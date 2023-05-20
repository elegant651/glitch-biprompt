import { WsV2 } from "chainrunner-sdk";
import BigNumber from "bignumber.js";


export const useChainRunner = () => {
  const apiKey = import.meta.env.VITE_BIFROST_KEY as string // 발급 받은 API Key

  // const asset_addr = '0x0000000000000000000000000000000000000000'
  const asset_addr = '0x28661511CDA7119B2185c647F23106a637CC074f'

  const viewAssets = async () => {
    const client = new WsV2(
      "wss://api.glitch.chainrunner.io",
      window.ethereum,
      "GLITCH/KOREA",
      apiKey
    );

    const response = await client.call<any>(
      "Glitch.view.info.assets",
      undefined,
      new BigNumber(0xbfc0)
    );
  
    console.log(JSON.stringify(response.result, undefined, 2));
  }

  const getBalance = async () => {
    const client = new WsV2(
      "wss://api.glitch.chainrunner.io",
      window.ethereum,
      "GLITCH/KOREA",
      apiKey
    );

    const response = await client.call<any>(
      "Glitch.view.account.balance",
      undefined,
      "0x0000000000000000000000000000000000000000",
      BigNumber(0xbfc0),
    );
    
    console.log(response.result);
    return response.result;
  }

  const buyAsset = async () => {
    const client = new WsV2(
      "wss://api.glitch.chainrunner.io",
      window.ethereum,
      "GLITCH/KOREA",
      apiKey
    );

    const response = await client.call<any>(
      "Glitch.run.buy",
      undefined,
      "bifswap",
      [
        "0x0000000000000000000000000000000000000000",
        "0x1745F24d85192545E5eD1c9574782d067D3Fda09",
        "0x28661511CDA7119B2185c647F23106a637CC074f"
      ],
      BigNumber(163.660114538325451773),
      BigNumber(10),
      BigNumber(0xbfc0),
      BigNumber(0.5),
    );    
  
    console.log(JSON.stringify(response.result, undefined, 2));
  }

  const sellAsset = async () => {
    const client = new WsV2(
      "wss://api.glitch.chainrunner.io",
      window.ethereum,
      "GLITCH/KOREA",
      apiKey
    );

    const response = await client.call<any>(
      "Glitch.run.sell",
      undefined,
      "bifswap",
      [
        "0x28661511CDA7119B2185c647F23106a637CC074f",
        "0x1745F24d85192545E5eD1c9574782d067D3Fda09",
        "0x0000000000000000000000000000000000000000"
      ],
      BigNumber(10),
      BigNumber(166.42179219007622),
      BigNumber(0xbfc0),
      BigNumber(0.5),
    );
  
    console.log(JSON.stringify(response.result, undefined, 2));
  }

  const predictBridge = async () => {
    const client = new WsV2(
      "wss://api.glitch.chainrunner.io",
      window.ethereum,
      "GLITCH/KOREA",
      apiKey
    );
    
    const response = await client.call<any>(
      "Glitch.predict.bridge",
      undefined,
      asset_addr,
      BigNumber(5),
      BigNumber(0xbfc0),
      BigNumber(5),
    );
    
    console.log(response.result);
    return response.result;
  }

  const approveBridge = async () => {
    const client = new WsV2(
      "wss://api.glitch.chainrunner.io",
      window.ethereum,
      "GLITCH/KOREA",
      apiKey
    );

    const response = await client.call<any>(
      "Glitch.approve.bridge",
      undefined,
      "bifrostBridge",
      asset_addr,
      BigNumber(5),
      BigNumber(0xbfc0),
      null,
    );
    
    console.log(response.result);
    return response.result;
  }

  const bridge = async () => {
    const client = new WsV2(
      "wss://api.glitch.chainrunner.io",
      window.ethereum,
      "GLITCH/KOREA",
      apiKey
    );

    const response = await client.call<any>(
      "Glitch.run.bridge",
      undefined,
      "bifrostBridge",
      asset_addr,
      BigNumber(5),
      BigNumber(0xbfc0),
      BigNumber(5),
    );
    
    console.log(response.result);
    return response.result;
  }

  return { viewAssets, getBalance, buyAsset, sellAsset, predictBridge, approveBridge, bridge }
}