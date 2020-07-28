const initialState = {
    events: [],
    currentId: null
};

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case "ADD_EVENTS":
            return state = {...state, events: [ ...state.events, ...action.value ]}
        case "ADD_ID":
            return state = { ...state, currentId: action.value }    
        default:
            return state;    
    }
}