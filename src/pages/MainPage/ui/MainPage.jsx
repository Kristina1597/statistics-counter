import {CandidateDescription} from '../../../components/CandidateDescription/CandidateDescription';
import {isOpenedInDesktop} from '../../../helpers/helpers';
import desktopStyles from './MainPageStyeles.module.css';
import mobileStyles from './MainPageMobileStyles.module.css';
import Box from '@mui/material/Box';

export const MainPage = () => {
    const isDesktop = isOpenedInDesktop();
    const styles = isDesktop ? desktopStyles : mobileStyles;

    if (isDesktop) {
        return (
            <Box className={styles.mainPage_background}>
                <CandidateDescription/>
            </Box>
        )
    }
};