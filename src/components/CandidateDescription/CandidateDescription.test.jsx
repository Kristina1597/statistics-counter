import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../core/store/store";
import {CandidateDescription} from "./CandidateDescription";
import {render} from "@testing-library/react";



jest.mock('./CandidateDescription', () => () => 'CandidateDescription');




describe('candidate description test', () => {
    const renderFunc = () => {
        return render(
            <Provider store={store}>
                <Router>
                    <CandidateDescription/>
                </Router>
            </Provider>
        )
    };
    test('test for name', () => {
        renderFunc()
        const mockedName = 'Ivan Ivanov'
        expect(screen.getByText(mockedName)).toBeInTheDocument()
    })
})