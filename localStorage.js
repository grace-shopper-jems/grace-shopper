// export const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem('cart')
//     console.log('.....!!!', serializedState)
//     if (serializedState === null) {
//       return undefined
//     }
//     return JSON.parse(serializedState)
//   } catch (err) {
//     return undefined
//   }
// }

// export const saveState = cart => {
//   console.log('cart from localStorage', cart)
//   try {
//     const serializedState = JSON.stringify(cart)
//     localStorage.setItem('cart', serializedState)
//   } catch (error) {
//     console.error(error)
//   }
// }
