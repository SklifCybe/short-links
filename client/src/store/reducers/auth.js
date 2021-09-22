const storageName = 'userData';

const getUserData = () => JSON.parse(localStorage.getItem(storageName));

const initialState = {
  token: getUserData()?.token || null,
  userId: getUserData()?.userId || null,
  isAuthenticated: !!getUserData()?.token,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem(
        storageName,
        JSON.stringify({ token: action.payload.token, userId: action.payload.userId }),
      );
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      localStorage.removeItem(storageName);
      return {
        ...state,
        token: null,
        userId: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
