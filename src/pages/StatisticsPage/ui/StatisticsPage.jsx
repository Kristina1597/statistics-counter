import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStatisticsData } from '../../../core/actionCreators/actionCreators';
import {
    calculatePercentDifference,
    calculatePurchasesSummary,
    getStatisticsForPeriod,
    getStatisticsForViewsToClicksSummary,
    makeConversion
} from '../../../helpers/helpers';
import { Chart } from '../../../components/Chart/Chart';
import { DatePickerComponent } from '../../../components/DatePicker/DatePicker';
import Box from '@mui/material/Box';
import { Card, Typography } from '@mui/material';
import styles from './StatisticsPageStyle.module.css';

export const StatisticsPage = ({ statistics }) => {
    useEffect(() => {
        if (!isStatistics) {
            dispatch(getStatisticsData());
        }
    });

    const dispatch = useDispatch();
    const isStatistics = Object.keys(statistics).length;
    const firstPeriod = useSelector(state => state.appReducer.firstPeriod);
    const secondPeriod = useSelector(state => state.appReducer.secondPeriod);
    const periods = [firstPeriod, secondPeriod];
    const [differencePurchases, setDifferencePurchases] = useState(0);
    const [summaryViewsToClicks, setSummaryViewToClicks] = useState({});
    const [summaryPurchases, setSummaryPurchases] = useState({});

    useEffect(() => {
        const summaryPurchasesForFirstPeriod = calculatePurchasesSummary(statisticsForPurchases, 1);
        const summaryPurchasesForSecondPeriod = calculatePurchasesSummary(statisticsForPurchases, 2);
        setSummaryPurchases({summaryPurchasesForFirstPeriod, summaryPurchasesForSecondPeriod});

        const difference = calculatePercentDifference(summaryPurchasesForFirstPeriod, summaryPurchasesForSecondPeriod);
        setDifferencePurchases(difference);

        setSummaryViewToClicks(getStatisticsForViewsToClicksSummary(statistics.viewToCLicks, periods));
    }, [firstPeriod, secondPeriod]);

    const statisticsForPurchases = getStatisticsForPeriod(statistics.purchases, periods, false);
    const statisticsForViewToClicks = getStatisticsForPeriod(statistics.viewToCLicks, periods, true);

    const summaryConversion = (makeConversion(summaryViewsToClicks.viewsSummaryForSecondPeriod, summaryViewsToClicks.clicksSummaryForSecondPeriod) + '%').replace('.', ',')

    return (
        <Box className={styles.statisticsPage_container}>
            <DatePickerComponent/>
            <Card sx={{
                margin: '22px 0 0 0',
                width: '100%',
                maxWidth: '512px',
                height: '279px',
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                boxShadow: '0 0 0',
                padding: '16px'
            }}>
                <Typography sx={{
                    lineHeight: '266%',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: '#000000',
                    fontSize: {
                        xs: '8px',
                        sm: '10px',
                        md: '12px',
                    }
                }}>
                    продажи
                </Typography>
                <Box className={styles.statisticsPage_price}>
                    <Box className={styles.statisticsPage_price_total}>
                        <Typography sx={{
                            marginRight: '8px',
                            fontSize: {
                                xs: '22px',
                                sm: '28px',
                                md: '34px',

                            },
                            lineHeight: '123.5%',
                            textTransform: 'uppercase',
                            color: '#0B79D0'
                        }}>
                            {summaryPurchases.summaryPurchasesForSecondPeriod + '₽'}
                        </Typography>
                        <Typography sx={{
                            padding: {
                                xs: '1px 4px',
                                md: '2px 4px'
                            },
                            gap: '10px',
                            width: {
                                xs: '28px',
                                sm: '33px',
                                md: '39px'
                            },
                            height: {
                                xs: '16px',
                                sm: '20px',
                                md: '24px'
                            },
                            fontSize: {
                                xs: '10px',
                                sm: '11px',
                                md: '12px'
                            },
                            background: 'rgba(154, 255, 158, 0.5)',
                            borderRadius: '4px',
                            lineHeight: '166%',
                            letterSpacing: '0.4px'
                        }}>
                            {differencePurchases >= 0 ? '+' + differencePurchases + '%' : differencePurchases + '%'}
                        </Typography>
                    </Box>
                    <Typography sx={{
                        lineHeight: '166%',
                        color: 'rgba(0, 125, 255, 0.5)',
                        letterSpacing: '0.4px'
                    }}>
                        {summaryPurchases.summaryPurchasesForFirstPeriod + '₽'}
                    </Typography>
                </Box>
                <Chart statistics={statisticsForPurchases} firstPeriod={firstPeriod} secondPeriod={secondPeriod}/>
            </Card>
            <Card sx={{
                margin: '25px 0 0 0',
                width: '100%',
                maxWidth: '512px',
                height: '299px',
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                boxShadow: '0 0 0',
                padding: '16px'
            }}>
                <Typography sx={{
                    lineHeight: '266%',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: '#000000',
                    fontSize: {
                        xs: '8px',
                        sm: '10px',
                        md: '12px',
                    },
                }}>
                    Просмотры → Клики
                </Typography>
                <Box className={styles.statisticsPage_price}>
                    <Box className={styles.statisticsPage_price_total}>
                        <Typography sx={{
                            marginRight: '8px',
                            fontSize: {
                                xs: '22px',
                                sm: '28px',
                                md: '34px',

                            },
                            lineHeight: '123.5%',
                            textTransform: 'uppercase',
                            color: '#000000'
                        }}>
                            {summaryConversion}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    justifyContent: 'space-between',
                }} className={styles.statisticsPage_price_total}>
                    <Typography sx={{
                        fontSize: {
                            xs: '10px',
                            sm: '11px',
                            md: '12px',
                        }
                    }}>
                        {summaryViewsToClicks.viewsSummaryForSecondPeriod + ' → ' + summaryViewsToClicks.clicksSummaryForSecondPeriod}
                    </Typography>
                    <Typography sx={{
                        color: '#757575',
                        fontSize: {
                            xs: '10px',
                            sm: '11px',
                            md: '12px',
                        }
                    }}>
                        {summaryViewsToClicks.viewsSummaryForFirstPeriod + ' → ' + summaryViewsToClicks.clicksSummaryForFirstPeriod}
                    </Typography>
                </Box>
                <Chart statistics={statisticsForViewToClicks} firstPeriod={firstPeriod} secondPeriod={secondPeriod}/>
            </Card>
        </Box>
    );
};