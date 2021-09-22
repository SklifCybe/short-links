export const login = (token, userId) => ({ type: 'LOGIN', payload: { token, userId } });

export const logout = () => ({ type: 'LOGOUT' });
