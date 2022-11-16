const bre = require('cudos-blast')

async function main() {
  const [alice, bob] = await bre.getSigners()
  const contract = await bre.getContractFromAddress('cudos1hrpna9v7vs3stzyd4z3xf00676kf78zpe2u5ksvljswn2vnjp3ysr6m74h')

  const QUERY_GET_GREETING = { get_greeting: {} }
  let response = await contract.query(QUERY_GET_GREETING, alice)
  console.log('Greeting: ' + response.greeting)

  const MSG_SET_GREETING = { set_greeting: { greeting: "Hiya peeps" } }
  const result = await contract.execute(MSG_SET_GREETING, bob)
  console.log(result)

  response = await contract.query(QUERY_GET_GREETING)
  console.log('New greeting: ' + response.greeting)
}

module.exports = { main: main }
