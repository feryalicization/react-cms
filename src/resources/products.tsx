import {
  List,
  Datagrid,
  TextField,
  NumberField,
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  Edit,
  EditButton,
  DeleteButton
} from 'react-admin';

export const ProductList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <NumberField source="price" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
      <NumberInput source="price" />
    </SimpleForm>
  </Create>
);

export const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <NumberInput source="price" />
    </SimpleForm>
  </Edit>
);
