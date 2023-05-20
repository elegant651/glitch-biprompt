import { Button, styled } from "@mui/material"
import { Result } from "../interface"

interface ICard {
  url: string | undefined
  price: number
  ticker: string
  onClick: (url: string | undefined, price: number, ticker: string) => void
}

export const Card = ({ url, price, ticker, onClick }: ICard) => {
  return (
      <a href="#">
          <img src={url} alt={'photo'} loading="lazy" width={250}  />
          <BuyButton onClick={() => onClick(url, price, ticker)} className="btnBuyItem">Buy {price} {ticker}</BuyButton>
      </a>
  )
}

const BuyButton = styled(Button)`
width: 100%;
height: 48px;
font-size: 16px;
line-height: 24px;
text-align: center;
color: #F5F5F5;
background: rgba(9, 211, 255, 0.8);
border-radius: 12px;
margin-bottom: 25px;
`