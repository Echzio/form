import { render } from 'react-dom';
import 'normalize.css/normalize.css';
import '@/assets/styles/global.scss';
import '@/assets/styles/colors.scss';

import App from '@/app';

render(<App />, document.getElementById('app'));
