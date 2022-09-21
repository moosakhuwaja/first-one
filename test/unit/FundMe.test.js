const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")
describe("FundMe", async function () {
  let fundMe
  let deployer
  let mockV3Aggregator
  //   const sendValue = "1000000000000000000"  OOOR
  const sendValue = ethers.utils.parseEther("1")

  beforeEach(async function () {
    //deploy our FundMe contract
    //using hardhat deploy
    // const accounts = await ethers.getSigners()
    // const accountsZero = accounts[0]
    deployer = (await getNamedAccounts()).deployer
    await deployments.fixture(["all"])
    fundMe = await ethers.getContract("FundMe", deployer)
    mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
  })
  describe("constructor", async function () {
    it("sets the aggregator address correctly", async function () {
      const response = await fundMe.PriceFeed()
      assert.equal(response, mockV3Aggregator.address)
    })
  })
  describe("fund", async function () {
    it("fails when you don't send enoung eth", async function () {
      await expect(fundMe.fund()).to.be.revertedWith(
        "You need to spend more eth"
      )
    })
    it("updated the amount funded data structure", async function () {
      await fundMe.fund({ Value: sendValue })
      const response = await funeMe.addressToAmmountFunded(deployer)
      assert.equal(response.toString(), sendValue.toString())
    })
  })
})
