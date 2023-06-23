
import { calculateTimeRemaining } from "./timerUtils";

describe('calculateTimeRemaining', () => {

  test('returns correct format for 30 days in future', () => {
    const targetDate = 1683794442000
    const now = 1681202442000
    const result = calculateTimeRemaining(targetDate, now);
    expect(result).toEqual(
      {
        days: 30,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    )
  });

  test('returns correct format for slightly in future', () => {
    const targetDate = 1683802861000
    const now = 1683712800000
    const result = calculateTimeRemaining(targetDate, now);
    expect(result).toEqual(
      {
        days: 1,
        hours: 1,
        minutes: 1,
        seconds: 1
      }
    )
  });

  test('returns correct format for slightly in past', () => {
    const targetDate = 1683712800000
    const now = 1683802861000
    const result = calculateTimeRemaining(targetDate, now);
    expect(result).toEqual(
      {
        days: -2,
        hours: -2,
        minutes: -2,
        seconds: -1
      }
    )
  });
  test('returns correct format for dates the same', () => {
    const targetDate = 1683802861000
    const now = 1683802861000
    const result = calculateTimeRemaining(targetDate, now);
    expect(result).toEqual(
      {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    )
  });

});