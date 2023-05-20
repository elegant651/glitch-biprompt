import { AxiosError } from 'axios';
import { Configuration, OpenAIApi } from 'openai';



const ACCESS_KEY = import.meta.env.VITE_OPENAI_API_KEY as string

function timeout(delay: number) {
  return new Promise( res => setTimeout(res, delay) );
}

export const getImages = async (query: string) => {
  const configuration = new Configuration({
      apiKey: ACCESS_KEY,
  });

  //temporary
  await timeout(2000)
  return [{
    img: 'b1.png',
    price: 5,
    ticker: 'BFC',
  }, {
    img: 'b2.png',
    price: 0.002,
    ticker: 'ETH'
  }, {
    img: 'b3.png',
    price: 3,
    ticker: 'USDC'
  }, {
    img: 'b4.png',
    price: 0.003,
    ticker: 'ETH'
  }, {
    img: 'b5.png',
    price: 30,
    ticker: 'BFC'
  }, {
    img: 'b6.png',
    price: 0.001,
    ticker: 'ETH'
  }, {
    img: 'b7.png',
    price: 5,
    ticker: 'USDC'
  }, {
    img: 'b8.png',
    price: 8,
    ticker: 'USDC'
  }]


  // try {
  //     const openai = new OpenAIApi(configuration);
  //     const response = await openai.createImage({
  //         prompt: query,
  //         n: 8,
  //         size: "1024x1024",
  //     });
  //     // console.log('result', response.data);
  //     return response.data.data;
  // } catch (error) {
  //     // throw new Error((error as AxiosError).message)
  //     await timeout(2000)
  //     return ['b1.png', 'b2.png', 'b3.png', 'b4.png', 'b5.png', 'b6.png', 'b7.png', 'b8.png']
  // }

}