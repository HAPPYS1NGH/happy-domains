const main = async () => {
  const [owner, randomPerson1 , randomPerson2] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy('happy');
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);
  
  const txn1 = await domainContract.register("happy"  , {value : hre.ethers.utils.parseEther('0.1')});
  await txn1.wait();
  // const txn2 = await domainContract.register("happysingh");
  // await txn2.wait();

  const domainAddress1 = await domainContract.getAddress("happy");
  console.log("Owner of domain:", domainAddress1);
  // const domainAddress2 = await domainContract.getAddress("happysingh")
  // console.log("Owner of domain :" , domainAddress2);
  
  const balance = await hre.ethers.provider.getBalance(domainContract.address)
  console.log("The balnce of the contract is ", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();``