import React from 'react';
import {
    formatDateForDisplaying,
    formatPeriodForDisplaying,
    formatPeriodToNewDateValue
} from '../../helpers/helpers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const RenderCustomizedLegend = ({ firstPeriod, secondPeriod }) => {
    const firstDay = new Date(firstPeriod[0]);
    const secondDay = new Date(secondPeriod[1]);

    const periods = [formatPeriodToNewDateValue(secondPeriod), formatPeriodToNewDateValue(firstPeriod)];
    const colors = ['#0B79D0', 'rgba(33, 150, 243, 0.5)'];

    return (
        <Box sx={{
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            color: '#757575'
        }}>
            <Typography sx={{
                display: {
                    xs: 'none',
                    sm: 'flex'
                },
                whiteSpace: 'nowrap'
            }}>
                {formatDateForDisplaying(firstDay)}
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    sm: 'row',
                },
                margin: '0 auto'
            }}>
                {
                    periods.map((entry, index) => (
                        <Box key={`item-${index}`}
                             sx={{
                                 display: 'flex',
                                 flexDirection: 'row',
                                 whiteSpace: 'nowrap',
                                 alignItems: 'center',
                                 lineHeight: '19.92px',
                                 letter: '0.4px'
                             }}>
                            <Box sx={{
                                marginRight: '4px',
                                marginLeft: '16px',
                                width: '4px',
                                height: '4px',
                                backgroundColor: colors[index],
                                borderRadius: '50%'
                            }}/>
                            {formatPeriodForDisplaying(entry).length > 20 ? index + 1 + ' период' : formatPeriodForDisplaying(entry)}
                        </Box>
                    ))
                }
            </Box>
            <Typography sx={{
                display: {
                    xs: 'none',
                    sm: 'flex'
                },
                whiteSpace: 'nowrap'
            }}>
                {formatDateForDisplaying(secondDay)}
            </Typography>
        </Box>
    );
};