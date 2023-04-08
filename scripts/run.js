const main = async () => {
  const [owner, randomPerson1 , superCoder] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy('happy');
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);
  
  let txn = await domainContract.register("happy"  , {value : hre.ethers.utils.parseEther('0.1')});
  await txn.wait();
  const txn2 = await domainContract.register("happysingh" , {value : hre.ethers.utils.parseEther('0.1')});
  await txn2.wait();

  const txn3 = await domainContract.register("eth" , {value : hre.ethers.utils.parseEther('0.5')});
  await txn3.wait();


  // const txn4 = await domainContract.register("happysingh323");
  // await txn4.wait();

  const domainAddress1 = await domainContract.getAddress("happy");
  console.log("Owner of domain:", domainAddress1);
  const domainAddress2 = await domainContract.getAddress("happysingh")
  console.log("Owner of domain :" , domainAddress2);
  const domainAddress3 = await domainContract.getAddress("eth")
  console.log("Owner of domain :" , domainAddress3);
  // const domainAddress4 = await domainContract.getAddress("happysingh323")
  // console.log("Owner of domain :" , domainAddress4);
  
  const balance = await hre.ethers.provider.getBalance(domainContract.address)
  console.log("The balnce of the contract is ", hre.ethers.utils.formatEther(balance));
  
  const domains = await domainContract.getAllNames();
  console.log(domains)

  // try {
  //   txn = await domainContract.connect(superCoder).withdraw();
  //   await txn.wait();
  // } catch(error){
  //   console.log("Could not rob contract");
  // }
  
  // Let's look in their wallet so we can compare later
  // let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  // console.log("Balance of owner before withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

  // // Oops, looks like the owner is saving their money!
  // txn = await domainContract.connect(owner).withdraw();
  // await txn.wait();
  
  // // Fetch balance of contract & owner
  // const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
  // ownerBalance = await hre.ethers.provider.getBalance(owner.address);

  // console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
  // console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

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

runMain();
