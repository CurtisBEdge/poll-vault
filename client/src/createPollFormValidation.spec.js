import {isValidDate, isValidInput, pollURLValidation} from "./createPollFormValidation";

describe('isEmptyInput', () => {
    test("returns false if the input is empty", () => {
        const result = isValidInput('');
        expect(result).toEqual(false)
    });

    test("returns false if the input only contains white space", () => {
        const result = isValidInput('    ');
        expect(result).toEqual(false)
    });

    test("returns false if the input contains no letters or numbers", () => {
        const result = isValidInput('£$%^&');
        expect(result).toEqual(false)
    });

    test("returns true if the input contains some letters", () => {
        const result = isValidInput('This is some text');
        expect(result).toEqual(true)
    });

    test("returns true if the input contains some numbers", () => {
        const result = isValidInput('This is option 3');
        expect(result).toEqual(true)
    });
})
describe ('pollURLValidation', () => {
    test("return false if the input is not a valid url", () => {
        const result = pollURLValidation('This is not valid URL');
        expect(result).toEqual(false)
    });
    test("return false if the input is empty", () => {
        const result = pollURLValidation('');
        expect(result).toEqual(false)
    });
    test("return true if it is a valid URL", () => {
        const result = pollURLValidation('http://example.com');
        expect(result).toEqual(true)
    });
})

describe (isValidDate, () => {
    test("return false if the date is in the past", () => {
        const result = isValidDate(1682935320000);
        expect(result).toEqual(false)
    });
    test("return empty string as it is in the future", () => {
        const result = isValidDate(1707480300000);
        expect(result).toEqual(true)
    });

})