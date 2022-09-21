import { checkIfFileExists, getImageAbsolutePath } from '../../utils'
import path from 'path'

describe('Test suite for fs utils file', () => {
  beforeAll(() => {
    process.env.LOG_LEVEL = 'silent'
  })

  it('Should get absolute path correctly', () => {
    expect(path.isAbsolute(getImageAbsolutePath('.'))).toBeTrue()
  })

  it('Should return true if file exist', () => {
    expect(checkIfFileExists('./.')).toBeTrue()
  })

  it("Should return false if file doesn't exist", () => {
    expect(checkIfFileExists('./RANDOM_FILE_')).toBeFalse()
  })
})
