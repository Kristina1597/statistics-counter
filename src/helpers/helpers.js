export const monthNamesEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
export const monthNamesRu = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря" ];

export const isOpenedInDesktop = () => {
    return window.screen.width > 1024
};

export const formatDate = (date) => {
    if (date === null) {
        return date
    }

    const newDate = date.toString().substring(4,15);
    const year = newDate.slice(7, 11);
    const monthIndex = monthNamesEn.findIndex(i => i === newDate.slice(0, 3)) + 1;
    const month = monthIndex < 10 ? '0' + monthIndex : monthIndex;
    const day = newDate.slice(4, 6);
    return year + '-' + month + '-' + day
};

export const convertToYYYYMMDD = (value) => {
    const date = new Date(value);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return [date.getFullYear(), month, day].join('-');
};

export const formatPeriodForDisplaying = (period) => {
    if (period[0] === null || !period.length) {
        return
    }
    const firstDateYear = period[0].getFullYear();

    const firstDateMonth = period[0].getMonth();
    const secondDateMonth = period[1].getMonth();

    const firstDateDay = period[0].getDate();
    const secondDateDay = period[1].getDate();

    if (firstDateMonth !== secondDateMonth) {
        return firstDateDay + ' ' + monthNamesRu[firstDateMonth] + '–' + secondDateDay + ' ' + monthNamesRu[secondDateMonth] + ' ' + firstDateYear
    }
    return firstDateDay + '–' + secondDateDay + ' ' + monthNamesRu[firstDateMonth] + ' ' + firstDateYear
};

export const formatPeriodToNewDateValue = (period) => {
    return period.map((i) => new Date(i))
};

export const isPeriodFull = (period) => !period.includes(null);

export const formatPeriods = (periods) => {
    const formattedValue = [];
    periods.forEach((i) => formattedValue.push(new Date(i)));
    return formattedValue
};

export const formatDateForDisplaying = (date) => {
    const year = date.getFullYear(0);
    const month = date.getMonth();
    const day = date.getDate();

    return day + ' ' + monthNamesRu[month] + ' ' + year
};

export const findIndexes = (arr, period) => {
    return arr.reduce((accumulator, current, index) => {
        if (period[0] <= current.date && current.date <= period[1]) {
            accumulator.push(index);
        }
        return accumulator;
    }, [])
};

export const makeConversion = (views, clicks) => {
    return ((clicks/views) * 100).toFixed(1)
};

export const calculateStatisticsForCorrectDiagram = (statistics) => {
    const newStatistics = [];
    const isSecondPeriodBigger = (firstValue, secondValue) => {
        return (firstValue - secondValue) < 0
    }

    statistics.forEach((i) => {
        let firstPeriodValue = i.firstPeriodValue - i.secondPeriodValue;
        let secondPeriodValue = i.secondPeriodValue;
        let thirdPeriodValue = 0;
        if (isSecondPeriodBigger(i.firstPeriodValue, i.secondPeriodValue)) {
            firstPeriodValue = 0;
            thirdPeriodValue = secondPeriodValue;
        }
        newStatistics.push({
            firstPeriodDate: i.firstPeriodDate,
            secondPeriodDate: i.secondPeriodDate,
            firstPeriodValue: firstPeriodValue,
            secondPeriodValue: secondPeriodValue,
            thirdPeriodValue: thirdPeriodValue
        })
    })

    return newStatistics
};

export const getStatisticsForPeriod = (statistics, periods, isConversion) => {
    const  transformedStatistics = [];
    const [indexesForFirstPeriod, indexesForSecondPeriod] = periods.map((i) => findIndexes(statistics, i));

    indexesForFirstPeriod.forEach((x) => indexesForSecondPeriod.forEach((y) => {
        if (indexesForFirstPeriod.indexOf(x) === indexesForSecondPeriod.indexOf(y)) {
            transformedStatistics.push({
                firstPeriodDate: statistics[x].date,
                secondPeriodDate: statistics[y].date,
                firstPeriodValue: isConversion ? makeConversion(statistics[x].view, statistics[x].click) : statistics[x].value,
                secondPeriodValue: isConversion ? makeConversion(statistics[y].view, statistics[y].click) : statistics[y].value
            });
        }
    }));

    return transformedStatistics
};

export const getStatisticsForViewsToClicksSummary = (statistics, periods) => {
    const  transformedStatistics = [];
    const [indexesForFirstPeriod, indexesForSecondPeriod] = periods.map((i) => findIndexes(statistics, i));

    indexesForFirstPeriod.forEach((x) => indexesForSecondPeriod.forEach((y) => {
        if (indexesForFirstPeriod.indexOf(x) === indexesForSecondPeriod.indexOf(y)) {

            transformedStatistics.push({
                viewsForFirstPeriod: statistics[x].view,
                viewsForSecondPeriod: statistics[y].view,
                clicksForFirstPeriod: statistics[x].click,
                clicksForSecondPeriod: statistics[y].click,
            });
        }
    }));

    const viewsSummaryForFirstPeriod = Math.round(transformedStatistics.reduce((res, i) => res + i.viewsForFirstPeriod, 0));
    const viewsSummaryForSecondPeriod = Math.round(transformedStatistics.reduce((res, i) => res + i.viewsForSecondPeriod, 0));
    const clicksSummaryForFirstPeriod = Math.round(transformedStatistics.reduce((res, i) => res + i.clicksForFirstPeriod, 0));
    const clicksSummaryForSecondPeriod = Math.round(transformedStatistics.reduce((res, i) => res + i.clicksForSecondPeriod, 0));

    return {
        viewsSummaryForFirstPeriod,
        viewsSummaryForSecondPeriod,
        clicksSummaryForFirstPeriod,
        clicksSummaryForSecondPeriod
    }
};

export const calculatePercentDifference = (summaryForFirstPeriod, summaryForSecondPeriod, ) => {
    return Math.round((summaryForSecondPeriod - summaryForFirstPeriod) * 100 / summaryForFirstPeriod);
};

export const calculatePurchasesSummary = (statistics, period) => {
    const summaryForFirstPeriod = Math.round(statistics.reduce((res, i) => res + i.firstPeriodValue, 0));
    const summaryForSecondPeriod = Math.round(statistics.reduce((res, i) => res + i.secondPeriodValue, 0));

    if (period === 1) {
        return summaryForFirstPeriod
    }

    if (period === 2) {
        return summaryForSecondPeriod
    }
};
