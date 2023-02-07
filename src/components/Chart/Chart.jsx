import React from 'react';
import {
    Bar,
    BarChart,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { calculateStatisticsForCorrectDiagram } from '../../helpers/helpers';
import { RenderCustomizedLegend } from '../CustomizedLegend/CustomizedLegend';

export const Chart = ({ statistics, firstPeriod, secondPeriod }) => {
    const newStatisticsData = calculateStatisticsForCorrectDiagram(statistics);

    return (
        <ResponsiveContainer width='100%' maxWidth={'480px'} height='100%' maxHeight={'175px'} margin='8.23px 0 0'>
            <BarChart
                width={500}
                height={300}
                data={newStatisticsData}
                margin={{
                    top: 31
                }}
                barCategoryGap='0.5px'
            >
                {(firstPeriod && secondPeriod) && <Legend
                    width='100%'
                    height={'20px'}
                    content={<RenderCustomizedLegend firstPeriod={firstPeriod}
                                                     secondPeriod={secondPeriod}
                    />}
                />}
                <Bar dataKey='secondPeriodValue' stackId='a' fill='#64B6F7'/>
                <Bar dataKey='thirdPeriodValue' stackId='a' fill='#2196F380'/>
                <Bar dataKey='firstPeriodValue' stackId='a' fill='#e9f4fe'/>
            </BarChart>
        </ResponsiveContainer>
    )
};
