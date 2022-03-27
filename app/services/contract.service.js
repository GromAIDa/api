const { ethers } = require('ethers');
const Transition = require('../schemas/Transition');
const abi = require('../../abi/erc20abi');
require('dotenv').config();

exports.contractEventEmitter = async () => {
  const provider = await new ethers.providers.EtherscanProvider(
    process.env.NETWORK,
    process.env.ETHERSCAN_API_KEY_TOKEN
  );

  const contract = await new ethers.Contract(
    abi.contract_address,
    abi.ERC20_ABi,
    provider
  );

  contract.on('Transfer', async (from, to, value, event) => {
    const balance = await contract.balanceOf(abi.address);
    const transition = {
      balance: ethers.utils.formatEther(balance),
      from,
      to,
      value: ethers.utils.formatEther(value),
      data: event,
    };
    Transition.find(
      { 'data.transactionHash': transition.data.transactionHash },
      (err, docs) => {
        if (!docs.length) {
          Transition.create(transition);
        }
      }
    );
  });
};
