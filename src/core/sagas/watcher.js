import { put, takeLatest } from '@redux-saga/core/effects'
import axios from 'axios';
import * as actionType from '../actionCreators/actionCreators';
import {
    setFirstPeriod,
    setSecondPeriod,
    setStatistics
} from '../actionCreators/actionCreators';
import { convertToYYYYMMDD } from '../../helpers/helpers';

function* getStatisticsSaga() {
    try {
        const { data } = yield axios.get('https://wegotrip.com/api/v2/stats/plot');
        const minDate = data.purchases[0].date;
        const firstPeriod = new Date(minDate);
        const secondPeriodFirstDate = new Date(minDate);
        secondPeriodFirstDate.setFullYear(secondPeriodFirstDate.getFullYear() + 1);
        const secondPeriodSecondDate = new Date(secondPeriodFirstDate);

        yield put(setFirstPeriod([minDate, convertToYYYYMMDD(firstPeriod.setDate(firstPeriod.getDate() + 30))]));
        yield put(setSecondPeriod([convertToYYYYMMDD(secondPeriodFirstDate), convertToYYYYMMDD(secondPeriodSecondDate.setDate(secondPeriodSecondDate.getDate() + 30))]));
        yield put(setStatistics(data));
    } catch (error) {
        console.log(error);
    }
}

export function* watcher() {
    yield takeLatest(actionType.GET_STATISTICS_DATA, getStatisticsSaga);
}
