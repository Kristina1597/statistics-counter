import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStatisticsData } from './core/actionCreators/actionCreators';
import { MainPage } from './pages/MainPage/ui/MainPage';
import { StatisticsPage } from './pages/StatisticsPage/ui/StatisticsPage';
import { ThemeProvider } from '@emotion/react';
import { theme } from './assets/theme';

function App() {
    const dispatch = useDispatch();
    const statistics = useSelector(state => state.appReducer.statistics);
    const isStatistics = Object.keys(statistics).length;

    useEffect(() => {
        if (!isStatistics) {
            dispatch(getStatisticsData());
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route exact path={'/'} element={<MainPage/>}/>
                {isStatistics &&
                <Route exact path={'/statistics'} element={<StatisticsPage statistics={statistics}/>}/>
                }
            </Routes>
        </ThemeProvider>
    );
}

export default App;
