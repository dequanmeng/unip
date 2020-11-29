export const initialState = {
    auth:false,
    user: null
  };
  
  // Selector

  
  const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      
      case "AUTH":
          return{
              ...state,
              auth: action.auth
          }
  
      
      
      case "SET_USER":
        return {
          ...state,
          user: action.user
        }
  
      default:
        return state;
    }
  };
  
  export default reducer;