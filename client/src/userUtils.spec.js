import { notValidUsername, notValidPassword, passwordsDontMatch } from "./userUtils";

describe('notValidPassword', () => {

  test('returns true for undefined', () => {
    const result = notValidPassword(undefined);
    expect(result).toEqual(true)
  });

  test('returns true for null', () => {
    const result = notValidPassword(null);
    expect(result).toEqual(true)
  });

  test('returns true for empty', () => {
    const result = notValidPassword('');
    expect(result).toEqual(true)
  });

  test('returns true for less than 8 characters', () => {
    const result = notValidPassword('1Xxxxxx');
    expect(result).toEqual(true)
  });
  test('returns true for no numbers', () => {
    const result = notValidPassword('XXXXxxxxX');
    expect(result).toEqual(true)
  });
  test('returns true for invalid symbols', () => {
    const result = notValidPassword('%$£@S1xxx');
    expect(result).toEqual(true)
  });
  test('returns true for no uppercase', () => {
    const result = notValidPassword('all4xxxx');
    expect(result).toEqual(true)
  });
  test('returns true for no lower case', () => {
    const result = notValidPassword('XXXX6XXXX');
    expect(result).toEqual(true)
  });
  test('returns false for valid password', () => {
    const result = notValidPassword('Password1');
    expect(result).toEqual(false)
  });


});

describe('notValidUsername', () => {

  test('returns true for undefined', () => {
    const result = notValidUsername(undefined);
    expect(result).toEqual(true)
  });

  test('returns true for null', () => {
    const result = notValidUsername(null);
    expect(result).toEqual(true)
  });

  test('returns true for empty', () => {
    const result = notValidUsername('');
    expect(result).toEqual(true)
  });

  test('returns true for less than 3 characters', () => {
    const result = notValidUsername('x');
    expect(result).toEqual(true)
  });
  test('returns true for capital letters', () => {
    const result = notValidUsername('XXXXX');
    expect(result).toEqual(true)
  });
  test('returns true for invalid symbols', () => {
    const result = notValidUsername('%$£@');
    expect(result).toEqual(true)
  });
  test('returns true for containing numbers', () => {
    const result = notValidUsername('all4');
    expect(result).toEqual(true)
  });
  test('returns false for more than 3 characters', () => {
    const result = notValidUsername('xxxx');
    expect(result).toEqual(false)
  });
  test('returns false for underscore', () => {
    const result = notValidUsername('xxx_');
    expect(result).toEqual(false)
  });
});

describe('passwordsDontMatch', () => {

  test('returns false for passwords match', () => {
    const result = passwordsDontMatch('Password1', 'Password1');
    expect(result).toEqual(false)
  });

  test('returns true passwords dont match', () => {
    const result = passwordsDontMatch('Password1', 'Password2');
    expect(result).toEqual(true)
  });
});