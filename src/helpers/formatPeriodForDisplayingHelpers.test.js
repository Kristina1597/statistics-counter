const { formatPeriodForDisplaying, monthNamesRu } = require('./helpers');

describe('formatPeriodForDisplaying function', () => {
    test('formatPeriodForDisplaying with one month', () => {
        const mockedPeriod = [new Date('2020-01-01'), new Date('2020-01-30')];

        const formattedPeriod = formatPeriodForDisplaying(mockedPeriod);
        const year = '2020';
        const month = monthNamesRu[0];
        const firstDay = '1';
        const secondDay = '30';

        expect(typeof formattedPeriod).toBe('string');
        expect(formattedPeriod).toContain(year);
        expect(formattedPeriod).toContain(month);
        expect(formattedPeriod).toContain(firstDay);
        expect(formattedPeriod).toContain(secondDay);
    });

    test('formatPeriodForDisplaying with two months', () => {
        const mockedPeriod = [new Date('2020-01-15'), new Date('2020-02-01')];

        const formattedPeriod = formatPeriodForDisplaying(mockedPeriod);
        const year = '2020';
        const firstMonth = monthNamesRu[0];
        const secondMonth = monthNamesRu[1];
        const firstDay = '15';
        const secondDay = '1';

        expect(typeof formattedPeriod).toBe('string');
        expect(formattedPeriod).toContain(year);
        expect(formattedPeriod).toContain(firstMonth);
        expect(formattedPeriod).toContain(secondMonth);
        expect(formattedPeriod).toContain(firstDay);
        expect(formattedPeriod).toContain(secondDay);
    });

    test('formatPeriodForDisplaying with no first date', () => {
        const mockedPeriod = [null, new Date('2020-02-01')];

        const formattedPeriod = formatPeriodForDisplaying(mockedPeriod);

        expect(typeof formattedPeriod).toBe('undefined');
    });

    test('formatPeriodForDisplaying with empty period', () => {
        const mockedPeriod = [];

        const formattedPeriod = formatPeriodForDisplaying(mockedPeriod);

        expect(typeof formattedPeriod).toBe('undefined');
    })
});