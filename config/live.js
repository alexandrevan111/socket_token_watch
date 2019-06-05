module.exports = {
	web3: {
          provider: 'wss://mainnet.infura.io/ws'
     },
	contract: {
          new: {
               abi: "new.json",
               owner_address: '0x4c6831e6fe925bf19b071ab6bd8919d5b03964fc', // Contract Owner Address
               address: '0xD7CD762F3ebC2C9A3D9BCf0133e06d04C59a1F7D', // Address where contract is deployed
               password: '',
               decimals: 18
          },
          old: {
               abi: "old.json",
               owner_address: '0xc0927fd29d7fce2b59365d7f0b523684a24e914b', // Contract Owner Address
               address: '0x7528e3040376edd5db8263db2f5bd1bed91467fb', // Address where contract is deployed
               password: '',
               decimals: 18
          }
     },
	chainId: 1
};