const bre = require('cudos-blast')

describe('alpha contract', () => {
  // Optional timeout. Default is 15000
  jest.setTimeout(30 * 1000)

  const MSG_INIT = { greeting: "Hello world!" }
  const MSG_SET_GREETING = { greeting: "Hiya peeps" }
  const QUERY_GET_GREETING = { get_greeting: {} }

  let alice, bob, contract

  beforeAll(async () => {
    [alice, bob] = await bre.getSigners()
    contract = await bre.getContractFactory('alpha')
    await contract.deploy(MSG_INIT, 'alpha', { signer: bob })
  })

  test('Set greeting', async () => {
    await contract.execute(MSG_SET_GREETING, alice)
    return expect(contract.query(QUERY_GET_GREETING))
      .resolves.toEqual({ greeting: "Hiya peeps" })
  })

  test('Set greeting from user throws unauthorized', () => {
    return expect(contract.execute(MSG_RESET, alice))
      .rejects.toThrow('Unauthorized')
  })
})
