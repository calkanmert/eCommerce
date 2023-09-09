export default (errors: any): boolean => {
  let isHasError = false;
  const keys = Object.keys(errors).some((key) => {
    isHasError = errors[key].length > 0;
  });
  return isHasError;
};
