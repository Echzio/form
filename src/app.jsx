import { hot } from 'react-hot-loader/root';

import { Background } from '@/components/background/background';
import { Form } from '@/components/form/form';

import { FormContext } from '@/context/formContext';
import { useFormContext } from '@/hooks';

const App = () => {
  const { store, dispatch } = useFormContext();

  return (
    <>
      <Background />
      <FormContext.Provider value={{ store, dispatch }}>
        <Form name="Форма авторизации" />
      </FormContext.Provider>
    </>
  );
};

export default hot(App);
