declare namespace API {
  type BaseResponse = {
    code?: number;
    msg?: string;
    data?: Record<string, any>;
  };

  type BaseResponseBoolean = {
    code?: number;
    msg?: string;
    data?: boolean;
  };

  type BaseResponsePageBeanListUserInfoResponse = {
    code?: number;
    msg?: string;
    data?: PageBeanListUserInfoResponse;
  };

  type BaseResponseString = {
    code?: number;
    msg?: string;
    data?: string;
  };

  type BaseResponseUserInfoResponse = {
    code?: number;
    msg?: string;
    data?: UserInfoResponse;
  };

  type BaseResponseUserLoginResponse = {
    code?: number;
    msg?: string;
    data?: UserLoginResponse;
  };

  type DeleteRequest = {
    id?: number;
  };

  type ListUserInfoResponse = {
    id?: number;
    userAccount?: string;
    username?: string;
    userEmail?: string;
    userRole?: string;
    description?: string;
    createTime?: string;
    updateTime?: string;
  };

  type PageBeanListUserInfoResponse = {
    total?: number;
    items?: ListUserInfoResponse[];
  };

  type updateAvatarParams = {
    avatarUrl: string;
  };

  type UpdateUserInfoRequest = {
    id?: number;
    userAccount?: string;
    username?: string;
    userEmail?: string;
    description?: string;
    userRole?: string;
  };

  type UpdateUserRoleRequest = {
    userAccount: string;
    newUserRole: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    username?: string;
    userEmail?: string;
    description?: string;
    userRole?: string;
  };

  type UserInfoResponse = {
    id?: number;
    userAccount?: string;
    username?: string;
    userEmail?: string;
    userRole?: string;
    userPic?: string;
  };

  type UserLoginRequest = {
    userAccount: string;
    userPassword: string;
  };

  type UserLoginResponse = {
    token?: string;
    id?: number;
    userAccount?: string;
    userRole?: string;
    username?: string;
    userEmail?: string;
    userPic?: string;
  };

  type UserQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    userAccount?: string;
    userRole?: string;
    username?: string;
  };

  type UserRegisterRequest = {
    userAccount: string;
    userPassword: string;
    checkPassword: string;
    username: string;
    userEmail: string;
  };

  type UserUpdateInfoRequest = {
    username: string;
    userEmail: string;
  };

  type UserUpdatePwdRequest = {
    oldPassword: string;
    newPassword: string;
    rePassword: string;
  };
}
