const main= async () =>{
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy('happy');
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);

    let txn = await domainContract.register("eth" ,  {value: hre.ethers.utils.parseEther('0.5')});
    await txn.wait();
    console.log("Minted domain eth.happy");

    txn = await domainContract.setRecord("eth" , "Now I got my eth name in happy extension")
    await txn.wait();
    console.log("Set record for eth.happy");

    const address = await domainContract.getAddress("eth");
    console.log("Owner of domain eth:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
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


