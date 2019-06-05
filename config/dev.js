module.exports = {
	web3: {
          provider: 'wss://ropsten.infura.io/ws'
     },
	contract: {
          new: {
               abi: "new.json",
               owner_address: '0xf3399d84571fac96eed37cd4b50baee807b67360', // Contract Owner Address
               address: '0x0bed46820c33b31033e0c3af435d089500caa724', // Address where contract is deployed
               password: '',
               decimals: 18
          },
          old: {
               abi: "old.json",
               owner_address: '0x06cf1395611c3789d4cbb7a6ce927503d4a9d22f', // Contract Owner Address
               address: '0x0eb72f4b9450a1b133acb40907f5e12e8a775d5f', // Address where contract is deployed
               password: '',
               decimals: 18
          }
     },
	chainId: 3
};