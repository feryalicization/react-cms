import { Admin, Resource } from 'react-admin';
import authProvider from './providers/authProvider';
import dataProvider from './providers/dataProvider';
import LoginPage from './pages/Login';
import { ProductList, ProductCreate, ProductEdit  } from './resources/products';

const App = () => {
  return (
    <Admin
      loginPage={LoginPage}
      authProvider={authProvider}
      dataProvider={dataProvider}
    >
      <Resource name="products" 
      list={ProductList} 
      create={ProductCreate}
      edit={ProductEdit} 
      />
    </Admin>
  );
};

export default App;
