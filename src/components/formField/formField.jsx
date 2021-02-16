import { useContext, useEffect, useRef, useState } from 'react';
import { FormContext } from '@/context/formContext';
import './style.scss';

const FormField = ({ id, type, name, value, error, errorMessage, validation }) => {
  const { dispatch } = useContext(FormContext);
  const [focused, setFocused] = useState(false);
  const [transitionError, setTransitionError] = useState(error);
  const timer = useRef(null);

  useEffect(() => {
    if (error) {
      clearTimeout(timer.current);
      setTransitionError(error);
    } else {
      timer.current = setTimeout(() => {
        setTransitionError(error);
      }, 300);
    }
  }, [error]);

  return (
    <div
      className={`form-field ${focused ? 'form-field_focused' : ''} ${
        value ? 'form-field_filled' : ''
      }`}>
      <label htmlFor={id}>
        <span className="form-field__name">{name}</span>
        {transitionError && (
          <span className={`form-field__error ${!error ? 'form-field__error_hide' : ''}`}>
            {errorMessage}
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onBlur={() => {
          setFocused(false);
          !!value && dispatch({ type: `validate_${id}`, payload: value.search(validation) === -1 });
        }}
        onFocus={() => setFocused(true)}
        onChange={e => {
          dispatch({ type: id, payload: e.target.value });
          dispatch({ type: `validate_${id}`, payload: false });
        }}
      />
    </div>
  );
};

export { FormField };
