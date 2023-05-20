import { useQuery } from '@tanstack/react-query';
import { Button } from "@mui/material"
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Card } from './Card';
import { ResponseAPI } from '../interface';
import { getImages } from "../utils";
import { Loading } from './Loading';
import { ChooseGridResults } from './ChooseGridResults';
import { MyBridge } from './MyBridge';

interface IGridResults {
    address: string
    handleLoading: (e: boolean) => void
    query: string
}

export const GridResults = ({ address, query, handleLoading }: IGridResults) => {
    const [trxHash, setTrxHash] = useState("");
    const { data, isLoading, error, isError } = useQuery<ResponseAPI>([query], () => getImages(query), { retry: false })
    const [showDialog, setShowDialog] = useState(false);
    const [metadataItem, setMetadataItem] = useState({
      url: '',
      ticker: '',
      price: 0
    });

    useEffect(() => handleLoading(isLoading), [isLoading])

    const mintImage = async (url: string) => {
      if(address.length > 0){
          // const web3 = new Web3((window as any).ethereum);
          // const contractAddr = import.meta.env.VITE_CONTRACT_ADDRESS as string;
          // const abiJson = ABI as AbiItem | AbiItem[];
          // const contract = new web3.eth.Contract(abiJson, contractAddr)

          // const loadingId = toast.loading("Minting NFT ...");

          // try{
          //     // Sending message to smart contract
          //     await contract.methods.mint(
          //         "GEN WEB3",
          //         query,
          //         url
          //     ).send({
          //         from: address,
          //         value: 0
          //     })
          //     .then(async function(receipt: any){
          //         setImageUsed(url as string);
          //         setTrxHash(`https://blockscout.scroll.io/tx/${receipt.transactionHash}`);
          //         toast.update(loadingId, { render: 'Minting is successful, check your wallet.', type: "success", isLoading: false, autoClose: 4000, closeButton: true });
          //     });
          // } catch (err: any) {
          //     toast.update(loadingId, { render: err.message, type: "error", isLoading: false, autoClose: 4000, closeButton: true });
          // }
      } else {
          toast.warn("Please connect wallet before minting");
      }
  }

    if (isLoading) return <Loading />

    if (isError) return <p>{(error as AxiosError).message}</p>


    return (
        <>
            <p className='no-results'>
                {data && data.length === 0 ? 'No results with: ' : 'Results with: '}
                <b>{query}</b>
            </p>

            {trxHash && <p className='txHash'><h3><a href={trxHash} target='_blank'>TxHash</a></h3></p> }

            <div className='grid'>
                {data.map((obj,index) => (<Card key={index} url={obj.img} price={obj.price} ticker={obj.ticker} onClick={(url, price, ticker) => { setMetadataItem({url, price, ticker}); setShowDialog(true)}} /> ))}
            </div>

            {/* <ChooseGridResults open={onShowDialog} query={query} data={data} /> */}
            {showDialog && <MyBridge metadata={metadataItem} />}
        </>
    )
}