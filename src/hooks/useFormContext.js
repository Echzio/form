import { useCallback, useReducer } from 'react';

function useFormContext() {
  const formData = {
    login: {
      name: 'Логин',
      validation: /[0-9a-z]{1,}@[0-9a-z]{1,}\.[0-9a-z]{2,}/gi,
      value: '',
      errorMessage: 'введен некорректный email',
      error: false,
      type: 'text',
    },
    password: {
      name: 'Пароль',
      validation: /.{4,}/gi,
      value: '',
      errorMessage: 'пароль не может быть короче 4 символов',
      error: false,
      type: 'password',
    },
  };
  const reducer = useCallback((state, { type, payload }) => {
    switch (type) {
      case 'login':
        return {
          ...state,
          login: {
            ...state.login,
            value: payload,
          },
        };
      case 'validate_login':
        return {
          ...state,
          login: {
            ...state.login,
            error: payload,
          },
        };
      case 'password':
        return {
          ...state,
          password: {
            ...state.password,
            value: payload,
          },
        };
      case 'validate_password':
        return {
          ...state,
          password: {
            ...state.password,
            error: payload,
          },
        };
      default:
        return state;
    }
  }, []);
  const [store, dispatch] = useReducer(reducer, formData);

  return {
    store,
    dispatch,
  };
}

export { useFormContext };
