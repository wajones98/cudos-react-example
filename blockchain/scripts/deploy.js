const bre = require('cudos-blast')

async function main() {
  const [alice] = await bre.getSigners()
  const contract = await bre.getContractFactory('hello_world')

  const MSG_INIT = { greeting: "Hello world!" }
  await contract.deploy(MSG_INIT, 'hello_world', { signer: alice })
  console.log(`Contract deployed at: ${contract.getAddress()}`)
}

module.exports = { main: main }
