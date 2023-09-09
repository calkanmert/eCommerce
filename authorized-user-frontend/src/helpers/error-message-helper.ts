export default (err: any) => {
  const data = err.response.data;
  return typeof data === 'object' ? data.message : data;
};
