import { ethers } from "ethers";
import { addresses } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as sHECv2 } from "../abi/sHecv2.json";
import { setAll } from "../helpers";

import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { IBaseAddressAsyncThunk, ICalcUserBondDetailsAsyncThunk } from "./interfaces";

export const getBalances = createAsyncThunk(
  "account/getBalances",
  async ({ address, networkID, provider }: IBaseAddressAsyncThunk) => {
    const gmaContract = new ethers.Contract(addresses[networkID].PAPA_ADDRESS as string, ierc20Abi, provider);
    const gmaBalance = await gmaContract.balanceOf(address);
    const sgmaContract = new ethers.Contract(addresses[networkID].SPAPA_ADDRESS as string, ierc20Abi, provider);
    const sgmaBalance = await sgmaContract.balanceOf(address);

    return {
      balances: {
        hec: ethers.utils.formatUnits(gmaBalance, "gwei"),
        shec: ethers.utils.formatUnits(sgmaBalance, "gwei"),
      },
    };
  },
);

export const loadAccountDetails = createAsyncThunk(
  "account/loadAccountDetails",
  async ({ networkID, provider, address }: IBaseAddressAsyncThunk) => {
    let gmaBalance = 0;
    let sgmaBalance = 0;
    let oldsgmaBalance = 0;
    let stakeAllowance = 0;
    let unstakeAllowance = 0;
    let oldunstakeAllowance = 0;
    let daiBondAllowance = 0;
    
    const daiContract = new ethers.Contract(addresses[networkID].DAI_ADDRESS as string, ierc20Abi, provider);
    const daiBalance = await daiContract.balanceOf(address);
    
    const gmaContract = new ethers.Contract(addresses[networkID].GMA_ADDRESS as string, ierc20Abi, provider);
    gmaBalance = await gmaContract.balanceOf(address);
    stakeAllowance = await gmaContract.allowance(address, addresses[networkID].STAKING_HELPER_ADDRESS);
    
    const sgmaContract = new ethers.Contract(addresses[networkID].SGMA_ADDRESS as string, sHECv2, provider);
    sgmaBalance = await sgmaContract.balanceOf(address);
    unstakeAllowance = await sgmaContract.allowance(address, addresses[networkID].STAKING_ADDRESS);
    // const oldsgmaContract = new ethers.Contract(addresses[networkID].OLD_SGMA_ADDRESS as string, sHECv2, provider);
    console.log("StaingDegu");
    oldsgmaBalance = 0;//await oldsgmaContract.balanceOf(address);
    oldunstakeAllowance = 0;//await oldsgmaContract.allowance(address, addresses[networkID].OLD_STAKING_ADDRESS);
    
    return {
      balances: {
        dai: ethers.utils.formatEther(daiBalance),
        gma: ethers.utils.formatUnits(gmaBalance, "gwei"),
        sgma: ethers.utils.formatUnits(sgmaBalance, "gwei"),
        oldsgma: ethers.utils.formatUnits(oldsgmaBalance, "gwei"),
      },
      staking: {
        gmaStake: +stakeAllowance,
        gmaUnstake: +unstakeAllowance,
        oldgmaUnstake: +oldunstakeAllowance,
      },
      bonding: {
        daiAllowance: daiBondAllowance,
      },
    };
  },
);

export interface IUserBondDetails {
  allowance: number;
  interestDue: number;
  bondMaturationBlock: number;
  pendingPayout: string; //Payout formatted in gwei.
}
export const calculateUserBondDetails = createAsyncThunk(
  "account/calculateUserBondDetails",
  async ({ address, bond, networkID, provider }: ICalcUserBondDetailsAsyncThunk) => {
    if (!address) {
      return {
        bond: "",
        displayName: "",
        bondIconSvg: "",
        isLP: false,
        isFour: false,
        allowance: 0,
        balance: "0",
        interestDue: 0,
        bondMaturationBlock: 0,
        pendingPayout: "",
      };
    }
    // dispatch(fetchBondInProgress());

    // Calculate bond details.
    const bondContract = bond.getContractForBond(networkID, provider);
    const reserveContract = bond.getContractForReserve(networkID, provider);

    let interestDue, pendingPayout, bondMaturationBlock;

    const bondDetails = await bondContract.bondInfo(address);
    interestDue = bondDetails.payout / Math.pow(10, 9);
    bondMaturationBlock = +bondDetails.vesting + +bondDetails.lastBlock;
    pendingPayout = await bondContract.pendingPayoutFor(address);

    let allowance,
      balance = 0;
    allowance = await reserveContract.allowance(address, bond.getAddressForBond(networkID));
    balance = await reserveContract.balanceOf(address);
    // formatEthers takes BigNumber => String
    // let balanceVal = ethers.utils.formatEther(balance);
    // balanceVal should NOT be converted to a number. it loses decimal precision
    let deciamls = 18;
    let balanceVal;
    if (bond.isLP) {
      deciamls = 18;
    }
    balanceVal = ethers.utils.formatEther(balance);
    if (bond.decimals) {
      balanceVal = ethers.utils.formatUnits(balance, "mwei");
    }
    return {
      bond: bond.name,
      displayName: bond.displayName,
      bondIconSvg: bond.bondIconSvg,
      isLP: bond.isLP,
      isFour: bond.isFour,
      allowance: Number(allowance),
      balance: balanceVal.toString(),
      interestDue,
      bondMaturationBlock,
      pendingPayout: ethers.utils.formatUnits(pendingPayout, "gwei"),
    };
  },
);

interface IAccountSlice {
  bonds: { [key: string]: IUserBondDetails };
  balances: {
    hec: string;
    shec: string;
    dai: string;
    oldshec: string;
  };
  loading: boolean;
}
const initialState: IAccountSlice = {
  loading: false,
  bonds: {},
  balances: { hec: "", shec: "", dai: "", oldshec: "" },
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAccountDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAccountDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAccountDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(getBalances.pending, state => {
        state.loading = true;
      })
      .addCase(getBalances.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getBalances.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(calculateUserBondDetails.pending, state => {
        state.loading = true;
      })
      .addCase(calculateUserBondDetails.fulfilled, (state, action) => {
        if (!action.payload) return;
        const bond = action.payload.bond;
        state.bonds[bond] = action.payload;
        state.loading = false;
      })
      .addCase(calculateUserBondDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      });
  },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
