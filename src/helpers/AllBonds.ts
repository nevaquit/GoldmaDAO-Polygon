import { StableBond, LPBond, NetworkID, CustomBond, BondType } from "src/lib/Bond";
import { addresses } from "src/constants";

import { ReactComponent as DaiImg } from "src/assets/tokens/DAI.svg";
import { ReactComponent as UsdcImg } from "src/assets/tokens/USDC.svg";
import { ReactComponent as UsdtImg } from "src/assets/tokens/USDT.svg";
import { ReactComponent as klimaImg } from "src/assets/tokens/KLIMA.svg";
import { ReactComponent as paxosImg } from "src/assets/tokens/PAXOS.svg";
import { ReactComponent as fraxImg } from "src/assets/tokens/FRAX.svg";
import { ReactComponent as bctImg } from "src/assets/tokens/BCT.svg";
import { ReactComponent as gmaDAI } from "src/assets/tokens/GMA-DAI.svg";
import { ReactComponent as gmaFraxImg } from "src/assets/tokens/GMA-FRAX.svg";
import { ReactComponent as gmaUsdtImg } from "src/assets/tokens/GMA-USDT.svg";
import { ReactComponent as gmaUsdcImg } from "src/assets/tokens/GMA-USDC.svg";
import { ReactComponent as gmaMaticImg } from "src/assets/tokens/GMA-MATIC.svg";

import { abi as BondGmaDaiContract } from "src/abi/bonds/GmaDaiContract.json";
import { abi as BondFraxGmaContract } from "src/abi/bonds/BondFraxGmaContract.json";
import { abi as ReserveGmaFraxContract } from "src/abi/reserves/ReserveGmaFraxContract.json";
import { abi as BondUsdcGmaContract } from "src/abi/bonds/BondUsdcGmaContract.json";
import { abi as BondUsdtGmaContract } from "src/abi/bonds/BondUsdtGmaContract.json";
import { abi as BondMaticGmaContract } from "src/abi/bonds/BondMaticGmaContract.json";
import { abi as ReserveGmaUsdcContract } from "src/abi/bonds/ReserveGmaUsdcContract.json";

import { abi as DaiBondContract } from "src/abi/bonds/DaiContract.json";
import { abi as UsdtBondContract } from "src/abi/bonds/Usdt.json";
import { abi as klimaBondContract } from "src/abi/bonds/klimaContract.json";
import { abi as ReserveHecDaiContract } from "src/abi/reserves/HecDai.json";
import { abi as ReserveHecUsdcContract } from "src/abi/reserves/HecUsdc.json";
import { abi as ReserveUsdtGmaContract } from "src/abi/reserves/UsdtGma.json";
import { getBondCalculator } from "src/helpers/BondCalculator";

import { abi as EthBondContract } from "src/abi/bonds/FtmContract.json";

import { abi as ierc20Abi } from "src/abi/IERC20.json";

// TODO(zx): Further modularize by splitting up reserveAssets into vendor token definitions
//   and include that in the definition of a bond
export const dai = new StableBond({
  name: "dai",
  displayName: "DAI",
  bondToken: "DAI",
  bondIconSvg: DaiImg,
  bondContractABI: DaiBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0xED531Fd96cbB45c377cE369ef1CF9BdcEB7E4e45",//depository
      reserveAddress: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",//DAI address
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xDea5668E815dAF058e3ecB30F645b04ad26374Cf",
      reserveAddress: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    },
  },
});

export const bct = new StableBond({
  name: "bct",
  displayName: "BCT",
  bondToken: "BCT",
  bondIconSvg: bctImg,
  bondContractABI: DaiBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x93548bccB8C6bCFC8de5F32dF113aA50860aC90C",//depository
      reserveAddress: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",//bct address
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xDea5668E815dAF058e3ecB30F645b04ad26374Cf",
      reserveAddress: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    },
  },
});

export const usdc = new StableBond({
  name: "usdc",
  displayName: "USDC",
  bondToken: "usdc",
  decimals: 6,
  bondIconSvg: UsdcImg,
  bondContractABI: DaiBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x740b1dDd49bc30968F4CAC1f0B654C53CAfC70F5",//usdc bond depositor
      reserveAddress: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",//usdc address
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xDea5668E815dAF058e3ecB30F645b04ad26374Cf",
      reserveAddress: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    },
  },
});

export const frax = new StableBond({
  name: "frax",
  displayName: "FRAX",
  bondToken: "frax",
  bondIconSvg: fraxImg,
  bondContractABI: DaiBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x4297BE89b64A17d418a6E8c54A92D8c2b12f0B5c",//depository
      reserveAddress: "0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",//frax address
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xDea5668E815dAF058e3ecB30F645b04ad26374Cf",
      reserveAddress: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    },
  },
});

export const klima = new StableBond({
  name: "klima",
  displayName: "KLIMA",
  bondToken: "klima",
  decimals: 9,
  bondIconSvg: klimaImg,
  bondContractABI: klimaBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x56Aca9Ba1be7Ea685613885Dce911A236a036670",//klima bond depositor
      reserveAddress: "0x4e78011ce80ee02d2c3e649fb657e45898257815",//klima address
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xDea5668E815dAF058e3ecB30F645b04ad26374Cf",
      reserveAddress: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    },
  },
});

export const paxos = new StableBond({
  name: "paxos",
  displayName: "PAXOS Gold(PAXG)",
  bondToken: "faxg",
  bondIconSvg: paxosImg,
  bondContractABI:DaiBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x1137F7539204e6D1fA1ADE405Cdb95963682E6E2",//depository
      reserveAddress: "0x553d3d295e0f695b9228246232edf400ed3560b5",//paxos address
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xDea5668E815dAF058e3ecB30F645b04ad26374Cf",
      reserveAddress: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    },
  },
});

export const usdt = new StableBond({
  name: "usdt",
  displayName: "USDT",
  bondToken: "usdt",
  decimals: 6,
  bondIconSvg: UsdtImg,
  bondContractABI: DaiBondContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x6E849ED4d5412C448cd4841Fa03FF0E76c7e17c0",
      reserveAddress: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xDea5668E815dAF058e3ecB30F645b04ad26374Cf",
      reserveAddress: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    },
  },
});

export const gma_dai = new LPBond({ 
  name: "gma_dai_lp",
  displayName: "GMA-DAI LP",
  bondToken: "DAI",
  bondIconSvg: gmaDAI,
  bondContractABI: BondGmaDaiContract,
  reserveContract: ReserveHecDaiContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x4f3f86118a19b72bf54af25681690fa595d890ee", //depository
      reserveAddress: "0xe251FbC535F45e4308B61255f6724597db5C6027",//gma-dai lp
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xcF449dA417cC36009a1C6FbA78918c31594B9377",
      reserveAddress: "0x8D5a22Fb6A1840da602E56D1a260E56770e0bCE2",
    },
  },
  lpUrl:
    "https://app.sushi.com/add/0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063/0xf8101bEFDC322Be3A79f930DEAf6B4CF2f65e521",
});

export const gma_frax = new LPBond({
  name: "gma_frax_lp",
  displayName: "GMA-FRAX LP",
  bondToken: "GMA-FRAX",
  bondIconSvg: gmaFraxImg,
  bondContractABI: BondFraxGmaContract,
  reserveContract: ReserveGmaFraxContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0xf870C14121a31785b2c76415Da6213961870C588", //depository
      reserveAddress: "0xF1FEE497F3Cf8cb2de05e826F87a65779c7903e0",//gma-dai lp
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xcF449dA417cC36009a1C6FbA78918c31594B9377",
      reserveAddress: "0x8D5a22Fb6A1840da602E56D1a260E56770e0bCE2",
    },
  },
  lpUrl:
    "https://app.sushi.com/add/0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89/0xf8101bEFDC322Be3A79f930DEAf6B4CF2f65e521",
});

export const gma_matic = new LPBond({ 
  name: "gma_matic_lp",
  displayName: "GMA-MATIC LP",
  bondToken: "GMA-MATIC",
  bondIconSvg: gmaMaticImg,
  bondContractABI: BondMaticGmaContract,
  reserveContract: ReserveHecDaiContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0xDbEe3A04b3d1B272becff0d548339D53fFc041a2", //depository
      reserveAddress: "0xF1FEE497F3Cf8cb2de05e826F87a65779c7903e0",//gma-dai lp
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xcF449dA417cC36009a1C6FbA78918c31594B9377",
      reserveAddress: "0x8D5a22Fb6A1840da602E56D1a260E56770e0bCE2",
    },
  },
  lpUrl:
    "https://app.sushi.com/add/0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270/0xf8101bEFDC322Be3A79f930DEAf6B4CF2f65e521",
});

export const gma_usdc = new LPBond({
  name: "gma_usdc_lp",
  displayName: "GMA-USDC LP",
  bondToken: "GMA-USDC",
  decimals: 6,
  bondIconSvg: gmaUsdcImg,
  bondContractABI: BondUsdcGmaContract,
  reserveContract: ReserveGmaUsdcContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0xacAEb12e98795528b1f5AC779d07D55059722D0C", 
      reserveAddress: "0xa6C54D97cc0132fd7e60579697568aD3Af61f387",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xcF449dA417cC36009a1C6FbA78918c31594B9377",
      reserveAddress: "0x8D5a22Fb6A1840da602E56D1a260E56770e0bCE2",
    },
  },
  lpUrl:
    "https://app.sushi.com/add/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/0xf8101bEFDC322Be3A79f930DEAf6B4CF2f65e521",
});

export const gma_usdt = new LPBond({
  name: "gma_usdt_lp",
  displayName: "GMA-USDT LP",
  bondToken: "GMA-USDT",
  decimals: 6,
  bondIconSvg: gmaUsdtImg,
  bondContractABI: BondUsdtGmaContract,
  reserveContract: ReserveUsdtGmaContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x1eb0165474eb387c79ec336f208411df878f8053", 
      reserveAddress: "0xaceb79bf4f0a26ccda8819e0b58ccbcd7e2070f3",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xcF449dA417cC36009a1C6FbA78918c31594B9377",
      reserveAddress: "0x8D5a22Fb6A1840da602E56D1a260E56770e0bCE2",
    },
  },
  lpUrl:
    "https://app.sushi.com/add/0xc2132D05D31c914a87C6611C10748AEb04B58e8F/0xf8101bEFDC322Be3A79f930DEAf6B4CF2f65e521",
});

// HOW TO ADD A NEW BOND:
// Is it a stableCoin bond? use `new StableBond`
// Is it an LP Bond? use `new LPBond`
// Add new bonds to this array!!
// export const allBonds = [gma_matic, gma, Paxosgold,tethergold, klima, MC02];

export const allBonds = [dai, bct, usdc, frax, klima, paxos, usdt, gma_dai, gma_frax, gma_usdc, gma_usdt, gma_matic];
export const allBondsMap = allBonds.reduce((prevVal, bond) => {
  return { ...prevVal, [bond.name]: bond };
}, {});

// Debug Log
// console.log(allBondsMap);
export default allBonds;
