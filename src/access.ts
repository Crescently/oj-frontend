/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: API.UserLoginResponse } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canUser: currentUser,
    canAdmin: currentUser?.userRole === 'admin',
  };
}
