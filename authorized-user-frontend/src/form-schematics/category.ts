import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required(),
});

export default schema;
