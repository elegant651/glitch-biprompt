import { Button } from "@mui/material"
import { useEffect } from "react"
import { useChainRunner } from "../hooks/chainrunner"

export const Title = ({ connectWallet, address} : any) => {
  
  const { viewAssets, getBalance, buyAsset, sellAsset, predictBridge, bridge, } = useChainRunner()
  
  return (
      <>
        <Button className="wallet" sx={{ color: '#fff'}} onClick={connectWallet}>{address.length > 0 ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "Connect Wallet"}</Button>
        {address.length > 0 ? <img src={'/bifrost-logo.png'} alt={'photo'} loading="lazy" width={20}  /> : <></>}
        <Button className="test" sx={{ color: '#fff'}} onClick={viewAssets}>View Assets</Button>
        {/* <Button className="test" sx={{ color: '#fff'}} onClick={getBalance}>Get Balance</Button> */}
        {/* <Button className="test" sx={{ color: '#fff'}} onClick={buyAsset}>Buy Asset</Button>
        <Button className="test" sx={{ color: '#fff'}} onClick={sellAsset}>Sell Asset</Button> */}
        {/* <Button className="test" sx={{ color: '#fff'}} onClick={bridge}>Bridge Assets</Button>
        <Button className="test" sx={{ color: '#fff'}} onClick={predictBridge}>Predict Bridge</Button> */}
      </>
  )
}
