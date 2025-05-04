declare namespace API {
  type BaseResponse = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    msg?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    msg?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    msg?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    msg?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getByIdUsingGETParams = {
    /** userId */
    userId: number;
  };

  type listByIdsUsingGETParams = {
    /** idList */
    idList: number[];
  };

  type LoginUserVO = {
    address?: string;
    createTime?: string;
    description?: string;
    id?: number;
    signature?: string;
    telephone?: string;
    updateTime?: string;
    userAccount?: string;
    userEmail?: string;
    userPic?: string;
    userRole?: string;
    username?: string;
  };

  type ModelAndView = {
    empty?: boolean;
    model?: Record<string, any>;
    modelMap?: Record<string, any>;
    reference?: boolean;
    status?:
      | 'CONTINUE'
      | 'SWITCHING_PROTOCOLS'
      | 'PROCESSING'
      | 'CHECKPOINT'
      | 'OK'
      | 'CREATED'
      | 'ACCEPTED'
      | 'NON_AUTHORITATIVE_INFORMATION'
      | 'NO_CONTENT'
      | 'RESET_CONTENT'
      | 'PARTIAL_CONTENT'
      | 'MULTI_STATUS'
      | 'ALREADY_REPORTED'
      | 'IM_USED'
      | 'MULTIPLE_CHOICES'
      | 'MOVED_PERMANENTLY'
      | 'FOUND'
      | 'MOVED_TEMPORARILY'
      | 'SEE_OTHER'
      | 'NOT_MODIFIED'
      | 'USE_PROXY'
      | 'TEMPORARY_REDIRECT'
      | 'PERMANENT_REDIRECT'
      | 'BAD_REQUEST'
      | 'UNAUTHORIZED'
      | 'PAYMENT_REQUIRED'
      | 'FORBIDDEN'
      | 'NOT_FOUND'
      | 'METHOD_NOT_ALLOWED'
      | 'NOT_ACCEPTABLE'
      | 'PROXY_AUTHENTICATION_REQUIRED'
      | 'REQUEST_TIMEOUT'
      | 'CONFLICT'
      | 'GONE'
      | 'LENGTH_REQUIRED'
      | 'PRECONDITION_FAILED'
      | 'PAYLOAD_TOO_LARGE'
      | 'REQUEST_ENTITY_TOO_LARGE'
      | 'URI_TOO_LONG'
      | 'REQUEST_URI_TOO_LONG'
      | 'UNSUPPORTED_MEDIA_TYPE'
      | 'REQUESTED_RANGE_NOT_SATISFIABLE'
      | 'EXPECTATION_FAILED'
      | 'I_AM_A_TEAPOT'
      | 'INSUFFICIENT_SPACE_ON_RESOURCE'
      | 'METHOD_FAILURE'
      | 'DESTINATION_LOCKED'
      | 'UNPROCESSABLE_ENTITY'
      | 'LOCKED'
      | 'FAILED_DEPENDENCY'
      | 'TOO_EARLY'
      | 'UPGRADE_REQUIRED'
      | 'PRECONDITION_REQUIRED'
      | 'TOO_MANY_REQUESTS'
      | 'REQUEST_HEADER_FIELDS_TOO_LARGE'
      | 'UNAVAILABLE_FOR_LEGAL_REASONS'
      | 'INTERNAL_SERVER_ERROR'
      | 'NOT_IMPLEMENTED'
      | 'BAD_GATEWAY'
      | 'SERVICE_UNAVAILABLE'
      | 'GATEWAY_TIMEOUT'
      | 'HTTP_VERSION_NOT_SUPPORTED'
      | 'VARIANT_ALSO_NEGOTIATES'
      | 'INSUFFICIENT_STORAGE'
      | 'LOOP_DETECTED'
      | 'BANDWIDTH_LIMIT_EXCEEDED'
      | 'NOT_EXTENDED'
      | 'NETWORK_AUTHENTICATION_REQUIRED';
    view?: View;
    viewName?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type User = {
    address?: string;
    createTime?: string;
    description?: string;
    id?: number;
    isDelete?: number;
    signature?: string;
    telephone?: string;
    updateTime?: string;
    userAccount?: string;
    userEmail?: string;
    userPassword?: string;
    userPic?: string;
    userRole?: string;
    username?: string;
  };

  type UserAddRequest = {
    address?: string;
    telephone?: string;
    userAccount?: string;
    userEmail?: string;
    userRole?: string;
    username?: string;
  };

  type UserInfoUpdateRequest = {
    address?: string;
    id?: number;
    telephone?: string;
    userAccount?: string;
    userEmail?: string;
    userRole?: string;
    username?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    telephone?: string;
    userAccount?: string;
    userRole?: string;
    username?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userEmail?: string;
    userPassword?: string;
    username?: string;
  };

  type UserUpdateAvatarRequest = {
    avatarUrl?: string;
    userId?: number;
  };

  type UserUpdateInfoRequest = {
    address?: string;
    description?: string;
    id?: number;
    signature?: string;
    telephone?: string;
    userEmail?: string;
    username?: string;
  };

  type UserUpdatePwdRequest = {
    newPassword?: string;
    oldPassword?: string;
    rePassword?: string;
    userId?: number;
  };

  type UserVO = {
    address?: string;
    description?: string;
    id?: number;
    signature?: string;
    telephone?: string;
    userAccount?: string;
    userEmail?: string;
    userPic?: string;
    userRole?: string;
    username?: string;
  };

  type View = {
    contentType?: string;
  };
}
