import { oneOf } from '../src/type-checker'

/**
 * oneOf typings
 */
describe('`oneOf` contract', () => {
  it('`oneOf(a, b, c)(x)` returns `x` when it is included in [a, b, c]', () => {
    const oneOfAbc = oneOf('a', 'b', 'c')
    expect(oneOfAbc('a')).toBe('a')
    expect(oneOfAbc('c')).toBe('c')
  })

  it('`oneOf(a, b, c)(x)` throws TypeError if `x` is not included in [a, b, c]', () => {
    const oneOfAbc = oneOf('a', 'b', 'c')
    expect(() => oneOfAbc('d' as any)).toThrowError(TypeError)
  })
})
