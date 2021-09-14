export const SET_RECEIVED_DATA = 'SET_RECEIVED_DATA'
export const SET_FAVORITE = 'SET_FAVORITE'
export const DELETE_ROUTE = 'DELETE_ROUTE'

export const getData =  () => async dispatch =>{
    const response = await fetch('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json');
    const receivedData = await response.json();

    dispatch(setReceivedData(receivedData))
}

export const setReceivedData = (receivedData) => {
    return {type: SET_RECEIVED_DATA, receivedData}
}
