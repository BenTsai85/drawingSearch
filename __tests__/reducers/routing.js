import routing from '../../src/reducers/routing'

describe('reducers/routing', () => {
  it('should handle default status', () => expect(routing(undefined, {})).toEqual({
    name: 'no routing name!',
    config: {},
    param: {},
    query: {}
  }))
})
