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

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    msg?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    msg?: string;
  };

  type BaseResponsePagePostCommentVO_ = {
    code?: number;
    data?: PagePostCommentVO_;
    msg?: string;
  };

  type BaseResponsePagePostVO_ = {
    code?: number;
    data?: PagePostVO_;
    msg?: string;
  };

  type BaseResponsePostVO_ = {
    code?: number;
    data?: PostVO;
    msg?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getPostVOByIdUsingGETParams = {
    /** id */
    id?: number;
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

  type PagePostCommentVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostCommentVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePostVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PostAddRequest = {
    content?: string;
    tags?: string[];
    title?: string;
  };

  type PostCommentAddRequest = {
    content?: string;
    postId?: number;
  };

  type PostCommentQueryRequest = {
    current?: number;
    pageSize?: number;
    postId?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type PostCommentVO = {
    content?: string;
    createTime?: string;
    id?: number;
    userVO?: UserVO;
  };

  type PostEditRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostFavourAddRequest = {
    postId?: number;
  };

  type PostQueryRequest = {
    content?: string;
    current?: number;
    favourUserId?: number;
    id?: number;
    notId?: number;
    orTags?: string[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type PostThumbAddRequest = {
    postId?: number;
  };

  type PostVO = {
    commentCount?: number;
    content?: string;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: number;
    tags?: string[];
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
    viewCount?: number;
  };

  type updatePostViewUsingGETParams = {
    /** id */
    id?: number;
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
