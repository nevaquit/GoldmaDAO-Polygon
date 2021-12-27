export const THE_GRAPH_URL = "https://api.thegraph.com/subgraphs/name/wkich/hector-subgraph";
export const EPOCH_INTERVAL = 14400;

// NOTE could get this from an outside source since it changes slightly over time
export const BLOCK_RATE_SECONDS = 2.2;

export const TOKEN_DECIMALS = 9;

interface IAddresses {
  [key: number]: { [key: string]: string };
}

export const addresses: IAddresses = {
  137: {
    DAI_ADDRESS: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063", // duplicate
    USDC_ADDRESS: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    GMA_ADDRESS: "0xf8101bEFDC322Be3A79f930DEAf6B4CF2f65e521",
    SGMA_ADDRESS: "0xa4d9dca41f66a84b452585a66183380a51addc24",
    STAKING_ADDRESS: "0xB0E5a4E7117DC762CA11c80D00B44a8450D70085", // The new staking contract
    STAKING_HELPER_ADDRESS: "0x94d839895541a34183a2B50511a84EEcb4723177", // Helper contract used for Staking only
    STAKING_WARMUP_ADDRESS: "0xa401c23BD6e33D5b2306aDF9d73E0B063f196Be2", // warmup contract used for Staking only
    TREASURY_ADDRESS: "0xa6F9be31Ca880229109A842C454777Df8bdC0D8c",
    DISTRIBUTOR_ADDRESS: "0x8b378404964ABf11E647Bb134817A0cfe8ef98aE",
    BONDINGCALC_ADDRESS: "0xaa18906C8042515c35dad7b2D3e771E7f7a34134",
    REDEEM_HELPER_ADDRESS: "0xD4ec9b6E1325feb5d2E9dd4AFDF9187C9B717bC7",
    // USDC_ADDRESS: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
  },
};
