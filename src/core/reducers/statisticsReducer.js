import * as actionType from '../actionCreators/actionCreators';

const initialState = {
    statistics: {},
    firstPeriod: '',
    secondPeriod: '',
};

export const statisticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_STATISTICS: {
            return {
                ...state,
                statistics: {
                    ...state.statistics,
                    purchases: action.payload.purchases,
                    viewToCLicks: action.payload.views_to_clicks
                }
            }
        }

        case actionType.SET_FIRST_PERIOD:
            return {
                ...state,
                firstPeriod: [...action.payload]
            }

            case actionType.SET_SECOND_PERIOD:
            return {
                ...state,
                secondPeriod: [...action.payload]
            }


        default:
            return {
                ...state
            }
    }
};