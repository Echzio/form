import { useContext } from 'react';
import { FormContext } from '@/context/formContext';

import { FormField } from '@/components/formField/formField';

import './style.scss';

const Form = ({ name }) => {
  const { store } = useContext(FormContext);
  const fieldsSuccess = Object.values(store).every(({ value, error }) => Boolean(value) && !error);

  const submit = e => {
    e.preventDefault();
    if (fieldsSuccess) {
      console.log('submitted');
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={submit}>
        <h1 className="form__title">{name}</h1>
        <div className="form__fields">
          {Object.entries(store).map(([key, value]) => (
            <FormField key={key} {...{ ...value, id: key }} />
          ))}
        </div>
        <button disabled={!fieldsSuccess} type="submit" className="form__submitter">
          отправить
        </button>
      </form>
    </div>
  );
};

export { Form };
