import { Provider } from 'react-redux'
import store from '../../redux/store'
import Form from '../Form/Form'
import List from '../List/List'
import Nav from '../Nav/Nav'

function App() {
  return (
    <Provider store={store}>
      <Nav />
      <Form />
      <List />
    </Provider>
  );
}

export default App;
