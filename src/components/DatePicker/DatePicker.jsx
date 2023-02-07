import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstPeriod, setSecondPeriod } from '../../core/actionCreators/actionCreators';
import {
    formatDate,
    formatPeriods,
    isPeriodFull
} from '../../helpers/helpers';
import { CustomInput } from '../CustomInput/CustomInput';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DatePickerComponent = () => {
    const dispatch = useDispatch();
    const firstPeriod = useSelector(state => state.appReducer.firstPeriod);
    const secondPeriod = useSelector(state => state.appReducer.secondPeriod);
    const periods = [firstPeriod, secondPeriod];
    const [firstPeriodDateRange, setFirstPeriodDateRange] = useState([null, null]);
    const [secondPeriodDateRange, setSecondPeriodDateRange] = useState([null, null]);
    const [firstPeriodStartDate, firstPeriodEndDate] = firstPeriodDateRange;
    const [secondPeriodStartDate, secondPeriodEndDate] = secondPeriodDateRange;

    useEffect(() => {
        if (Object.values(periods)[0].length) {
            const formattedPeriod1 = formatPeriods(periods[0]);
            const formattedPeriod2 = formatPeriods(periods[1]);

            setFirstPeriodDateRange(formattedPeriod1);
            setSecondPeriodDateRange(formattedPeriod2);
        }
    }, [firstPeriod, secondPeriod]);

    const onChange = (date, periodId) => {
        const period = [formatDate(date[0]), formatDate(date[1])];

        if (periodId === 0) {
            setFirstPeriodDateRange(date);
            if (isPeriodFull(period)) {
                dispatch(setFirstPeriod(period));
                const secondPeriod = period.map((i) => {
                    const date = new Date(i)
                    date.setFullYear(date.getFullYear() + 1)
                    return formatDate(date)
                })
                dispatch(setSecondPeriod(secondPeriod))
            }
        } else if (periodId === 1) {
            setSecondPeriodDateRange(date);
            if (isPeriodFull(period)) {
                dispatch(setSecondPeriod(period))
                const firstPeriod = period.map((i) => {
                    const date = new Date(i)
                    date.setFullYear(date.getFullYear() - 1)
                    return formatDate(date)
                })
                dispatch(setFirstPeriod(firstPeriod))
            }
        }
    };

    return (
        <Box sx={{
            marginTop: '50px',
            height: {
                xs: '20px',
                sm: '24px'
            },
            display: 'flex',
            flexDirection: {
                xs: 'column',
                sm: 'row'
            },
            justifyContent: {
                xs: 'center',
                sm: 'flex-end'
            },
            marginBottom: {
                xs: '5px',
                sm: 0
            },
            alignItems: 'center',

        }}>
            <DatePicker
                customInput={<CustomInput periodForDisplaying={firstPeriodDateRange}/>}
                minDate={new Date('2020-01-01')}
                maxDate={new Date('2020-12-31')}
                selectsRange={true}
                startDate={firstPeriodStartDate}
                endDate={firstPeriodEndDate}
                onChange={(update) => {
                    onChange(update, 0);
                }}
            />
            <Typography sx={{
                padding: '0 18px 0 16px',
                fontFamily: 'Roboto, sans-serif',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: {
                    xs: '12px',
                    sm: '14px'
                },
                lineHeight: '143%',
                letterSpacing: '0.15px',
                color: 'rgba(0, 0, 0, 0.54)',
            }}>
                vs
            </Typography>
            <DatePicker
                customInput={<CustomInput periodForDisplaying={secondPeriodDateRange}/>}
                minDate={new Date('2021-01-01')}
                maxDate={new Date('2021-12-31')}
                selectsRange={true}
                startDate={secondPeriodStartDate}
                endDate={secondPeriodEndDate}
                onChange={(update) => {
                    onChange(update, 1);
                }}
            />
        </Box>
    );
};