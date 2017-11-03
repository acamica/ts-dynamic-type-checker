import { str, bool, num, arr, obj, undef } from '../src/type-checker'

/**
 * Primitive typings
 */
describe('Primitive types', () => {
  describe('`bool` contract', () => {
    it('`bool(x)` returns `x` when it is a string', () => {
      expect(bool(false)).toBe(false)
      expect(bool(true)).toBe(true)
    })

    it('`bool(x)` throws TypeError if `x` is not a boolean', () => {
      expect(() => bool(9 as any)).toThrowError(TypeError)
      expect(() => bool({} as any)).toThrowError(TypeError)
      expect(() => bool('foo' as any)).toThrowError(TypeError)
      expect(() => bool(undefined as any)).toThrowError(TypeError)
    })
  })

  describe('`num` contract', () => {
    it('`num(x)` returns `x` when it is a number', () => {
      expect(num(3)).toBe(3)
      expect(num(-5)).toBe(-5)
    })

    it('`num(x)` throws TypeError if `x` is not a number', () => {
      expect(() => num('foo' as any)).toThrowError(TypeError)
      expect(() => num({} as any)).toThrowError(TypeError)
      expect(() => num(false as any)).toThrowError(TypeError)
      expect(() => num(undefined as any)).toThrowError(TypeError)
    })
  })

  describe('`str` contract', () => {
    it('`str(x)` returns `x` when it is a string', () => {
      expect(str('foo')).toBe('foo')
      expect(str('bar')).toBe('bar')
    })

    it('`str(x)` throws TypeError if `x` is not a string', () => {
      expect(() => str(9 as any)).toThrowError(TypeError)
      expect(() => str({} as any)).toThrowError(TypeError)
      expect(() => str(false as any)).toThrowError(TypeError)
      expect(() => str(undefined as any)).toThrowError(TypeError)
    })
  })

  describe('`arr` contract', () => {
    it('`arr(x)` returns `x` when it is an array', () => {
      const arr1 = []
      const arr2 = [1, 2, 3]
      expect(arr(arr1)).toBe(arr1)
      expect(arr(arr2)).toBe(arr2)
    })

    it('`arr(x)` throws TypeError if `x` is not an array', () => {
      expect(() => arr(9 as any)).toThrowError(TypeError)
      expect(() => arr({} as any)).toThrowError(TypeError)
      expect(() => arr(false as any)).toThrowError(TypeError)
      expect(() => arr(undefined as any)).toThrowError(TypeError)
    })
  })

  describe('`obj` contract', () => {
    it('`obj(x)` returns `x` when it is a object', () => {
      const obj1 = {}
      const obj2 = { foo: 'bar', baz: 2 }
      expect(obj(obj1)).toBe(obj1)
      expect(obj(obj2)).toBe(obj2)
    })

    it('`obj(x)` throws TypeError if `x` is not a object', () => {
      expect(() => obj(9 as any)).toThrowError(TypeError)
      expect(() => obj('foo' as any)).toThrowError(TypeError)
      expect(() => obj(false as any)).toThrowError(TypeError)
      expect(() => obj(undefined as any)).toThrowError(TypeError)
    })
  })

  describe('`undef` contract', () => {
    it('`undef(x)` returns `x` when it is a undefined', () => {
      expect(undef(undefined)).toBe(undefined)
    })

    it('`undef(x)` throws TypeError if `x` is not a undefined', () => {
      expect(() => undef(9 as any)).toThrowError(TypeError)
      expect(() => undef({} as any)).toThrowError(TypeError)
      expect(() => undef('foo' as any)).toThrowError(TypeError)
      expect(() => undef(false as any)).toThrowError(TypeError)
    })
  })
})
