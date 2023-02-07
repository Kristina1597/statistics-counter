import {CandidateDescription} from '../../../components/CandidateDescription/CandidateDescription';
import {isOpenedInDesktop} from '../../../helpers/helpers';
import styles from './MainPageStyeles.module.css';
import Box from '@mui/material/Box';

export const MainPage = () => {
    const isDesktop = isOpenedInDesktop();

    if (isDesktop) {
        return (
            <Box className={styles.mainPage_background}>
                <CandidateDescription/>
            </Box>
        )
    }
};