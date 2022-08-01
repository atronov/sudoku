import {range, uniqueRandomUint} from './iterables';

describe('uniqueRandomUint', () => {
    const uniqLimit = 100;
    it('has correct length', () => {
        expect(Array.from(uniqueRandomUint(uniqLimit))).toHaveLength(uniqLimit);
    });
    it('has only unique numbers', () => {
        const randomDigitsArray = [...uniqueRandomUint(uniqLimit)];
        const expectedDigitsSet = new Set(range(uniqLimit - 1));
        randomDigitsArray.forEach(curDigit => {
            expect(expectedDigitsSet).toContain(curDigit);
            expectedDigitsSet.delete(curDigit);
        });
        expect(expectedDigitsSet.size).toEqual(0);

    });
    it('has wrong sequence once at least', () => {
        const directSequence = [...range(uniqLimit)];
        const randomSequence = [...uniqueRandomUint(uniqLimit)];
        let wrongSequenceFlag = false;
        for (let i = 0; i < directSequence.length && !wrongSequenceFlag; i++) {
            wrongSequenceFlag = wrongSequenceFlag || directSequence[i] !== randomSequence[i];
        }
        expect(wrongSequenceFlag).toBeTruthy();
    });
});
