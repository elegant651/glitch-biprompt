import React, { useState, useEffect } from 'react';
import { Box, Card, Input, Button, Stack } from '@mui/material'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useChainRunner } from "../hooks/chainrunner"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  background: '#1C1E2A',
  '#customized-dialog-title': {
    background: '#1C1E2A',
    color: '#FFFFFF'
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    background: '#1C1E2A',
    color: '#FFFFFF'
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    background: '#1C1E2A',
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export const MyBridge = ({ metadata, showBridge } : any) => {
  
  const [open, setOpen] = useState(true);
  const logoIn = '/bifrost-logo.png'
  const logoOut = '/ethereum-icon.png'
  const [balance, setBalance] = useState('')
  const amountIn = 5
  const [amountOut, setAmountOut] = useState(0)
  const priceDescription = ''
  const { viewAssets, getBalance, buyAsset, sellAsset, predictBridge, approveBridge, bridge, } = useChainRunner()
  const [predictions, setPredictions] = useState([])

  const formattedBalanceOut = () => {
    return 1
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const request = async () => {
      const result =  await predictBridge()
      setPredictions(result.predictions)
      setAmountOut(result.predictions[0].amountDst.toString())

      const result2 = await getBalance();
      setBalance(result2.balance.toString())
    }
    request()
  }, [])

  const process = async () => {
    await approveBridge()
    await bridge()
  }

  return (
    <div>
        <BootstrapDialog
          minWidth={600}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" minWidth={400} onClose={handleClose}>
            My Bridge
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Box>
              <HeaderBox>My BFC</HeaderBox>
              {balance && <Box fontSize='32px' fontWeight='700' display='flex' gap={2}>{parseInt(balance).toFixed(2)}<img src={logoIn} width="20" alt={logoIn} /></Box> }
            </Box>
            <Box mt='20px'>
              <HeaderBox>From (BFC)</HeaderBox>
              <Stack direction='row' alignItems='center' sx={{ height: '50px', background: '#2E3140', borderRadius: '12px'}}>
                <Box mx='25px'>
                  <img src={logoIn} width="15" alt={logoIn} />
                </Box>
                <Input
                  sx={{ width: "160px", color: '#fff' }}
                  value={amountIn}
                />
              </Stack>  
            </Box>
            <Box display='flex' justifyContent="center" alignItems="center" my='20px'>
              <img src={'/arrow-down.png'} alt='img' loading="lazy" width={30} />
            </Box>
            <Box>
              <HeaderBox>To (ETH)</HeaderBox>
              <Stack direction='row' alignItems='center' sx={{ height: '50px', background: '#2E3140', borderRadius: '12px'}}>
                <Box mx='25px'>
                  <img src={logoOut} width="15" alt={logoOut} />
                </Box>
                <Input
                  sx={{ width: "160px", color: '#fff' }}
                  value={amountOut}
                />
              </Stack>  
              {/* <Box>{formattedBalanceOut()}</Box> */}
            </Box>
            <Box mt='25px'>
              <HeaderBox>Detail</HeaderBox>
              <Box>
              {predictions.map((predict, index) => (
                <DetailBox key={index}>
                  <div>assetDst : {predict.assetDst}</div>
                  <div>bridgeFee : {parseInt(predict.fee)}</div>
                  <div>Bridge: {predict.name} / {predict.protocol}</div>
                </DetailBox>
              ))}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <ExchangeButton autoFocus onClick={() => process()}>
              Bridge
            </ExchangeButton>
          </DialogActions>
        </BootstrapDialog>
    </div>
  );
}

const HeaderBox = styled(Box)`
font-weight: 400;
font-size: 14px;
line-height: 140%;
color: #959595;
`

const ExchangeButton = styled(Button)`
width: 432px;
height: 48px;
background: rgba(9, 211, 255, 0.8);
border-radius: 12px;
color: #fff;
font-weight: 500;
font-size: 16px;
margin-bottom: 15px;
`

const DetailBox = styled(Box)`
background: #191B26;
border: 1px solid #2C2F42;
border-radius: 16px;
color: #959595;
font-weight: 400;
font-size: 10px;
line-height: 140%;
`