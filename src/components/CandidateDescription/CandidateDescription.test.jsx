import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { store } from '../../core/store/store';
import { CandidateDescription } from './CandidateDescription';

const renderFunc = () => {
    return render(
        <Provider store={store}>
            <Router>
                <CandidateDescription/>
            </Router>
        </Provider>
    )
};

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('candidate description test', () => {
    beforeEach(() => {
        renderFunc();
    });

    test('test for name', () => {
        const name = screen.getByText('Kristina Filchenko');

        expect(name).toBeInTheDocument();
    });

    test('test for button', () => {
        const button = screen.getByText('Statistics');

        expect(button).toBeInTheDocument();
    });

    test('test for description', () => {
        const description = screen.getByText(`My name is Christina, I'm 25, I am a developer, but it wasn't always like that. At school, I dreamed of a profession that would give me pleasure, be interesting and benefit other people, that's why I decided to become a lawyer. I graduated from the university with honors, but when I started working, I realized that the expectation and reality didn't match. I've chosen programming because it is a perfect opportunity for constant self-development and it is very important for me that the profession is interesting and not boring. A large amount of information in this area is a plus for me. Secondly, IT is the most relevant and rapidly developing area in the modern world, which benefits many people. I chose frontend direction, made a training plan and got to work. The longer I studied, the more I realized that I made the right choice. In my free time from work I study English and Turkish languages, try to read work-related literature and do some sport. In free time I also spend time with family and friends.`);

        expect(description).toBeInTheDocument();
    });

    test('test for navigation', () => {
        const button = screen.getByText('Statistics');

        fireEvent.click(button);

        expect(button).toBeInTheDocument();
        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/statistics');
    });
});