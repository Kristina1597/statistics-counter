import React, { forwardRef } from 'react';
import { formatPeriodForDisplaying, isPeriodFull } from '../../helpers/helpers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CalendarIcon from '../../assets/images/calendar-icon.svg';
import styles from './CustomInput.module.css';

export const CustomInput = forwardRef(({ value, onClick, periodForDisplaying }, ref) => (
    <Box className='styles.custom_input' onClick={onClick} ref={ref} sx={{
        height: '24px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center'
    }}>
        <img src={CalendarIcon} className={styles.custom_input_icon} alt={'calendar-icon'}/>
        <Typography sx={{
            textAlign: 'start',
            whiteSpace: 'nowrap',
            height: {
                xs: '20px',
                sm: '24px'
            },            fontFamily: 'Roboto, sans-serif',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: {
                xs: '12px',
                sm: '14px'
            },            lineHeight: '143%',
            letterSpacing: '0.15px',
            color: 'rgba(0, 0, 0, 0.54)'
        }}>
            {isPeriodFull(periodForDisplaying) ? formatPeriodForDisplaying(periodForDisplaying) : 'Выберите период'}
        </Typography>
    </Box>
));