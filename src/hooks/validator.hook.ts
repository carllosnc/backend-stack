export const validatorHook = (result: any, c: any) => {
  if (!result.success) {
    return c.json({ success: false, errors: result.error.issues }, 400);
  }
};
