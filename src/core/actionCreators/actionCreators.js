import * as actionType from '../actionCreators/actionCreators';

export const GET_STATISTICS_DATA = 'GET_STATISTICS_DATA';
export const SET_AVAILABLE_DATES = 'SET_AVAILABLE_DATES';
export const SET_FIRST_PERIOD = 'SET_FIRST_PERIOD';
export const SET_SECOND_PERIOD = 'SET_SECOND_PERIOD';
export const SET_STATISTICS = 'SET_STATISTICS';

export const getStatisticsData = () => ({
    type: actionType.GET_STATISTICS_DATA,
});

export const setStatistics = (data) => ({
    type: actionType.SET_STATISTICS,
    payload: data
});

export const setAvailableDates = (availableDates) => ({
    type: actionType.SET_AVAILABLE_DATES,
    payload: availableDates
});

export const setFirstPeriod = (period) => ({
    type: actionType.SET_FIRST_PERIOD,
    payload: period
});

export const setSecondPeriod = (period) => ({
    type: actionType.SET_SECOND_PERIOD,
    payload: period
});