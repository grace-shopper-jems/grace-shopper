
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined // the reason we need this is because there are options like privacy mode that do not allow the use of local storage. If that is the case this will return undefined and the reducers will take over and initialize the state
    }
    return JSON.parse(serializedState)
  } catch (error) {
    return undefined // if any errors let the reducers set the state
  }
}

export const saveState = state => {
  console.log('cart from localStorage', state)
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    console.error(error)
  }
}
