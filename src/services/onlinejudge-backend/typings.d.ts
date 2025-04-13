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

  type BaseResponsePageBeanUserVo = {
    code?: number;
    msg?: string;
    data?: PageBeanUserVo;
  };

  type BaseResponseString = {
    code?: number;
    msg?: string;
    data?: string;
  };

  type BaseResponseUserLoginResponse = {
    code?: number;
    msg?: string;
    data?: UserLoginResponse;
  };

  type BaseResponseUserVo = {
    code?: number;
    msg?: string;
    data?: UserVo;
  };

  type DeleteRequest = {
    id?: number;
  };

  type PageBeanUserVo = {
    total?: number;
    items?: UserVo[];
  };

  type updateAvatarParams = {
    avatarUrl: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    username?: string;
    userEmail?: string;
    description?: string;
    userRole?: string;
  };

  type UserInfoUpdateRequest = {
    id?: number;
    userAccount?: string;
    username?: string;
    userEmail?: string;
    description?: string;
    userRole?: string;
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

  type UserRoleUpdateRequest = {
    userAccount: string;
    newUserRole: string;
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

  type UserVo = {
    id?: number;
    userAccount?: string;
    username?: string;
    userEmail?: string;
    userRole?: string;
    userPic?: string;
    description?: string;
    createTime?: string;
    updateTime?: string;
  };
}
