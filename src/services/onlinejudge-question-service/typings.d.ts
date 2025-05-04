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

  type BaseResponsePageCommentVO_ = {
    code?: number;
    data?: PageCommentVO_;
    msg?: string;
  };

  type BaseResponsePageQuestion_ = {
    code?: number;
    data?: PageQuestion_;
    msg?: string;
  };

  type BaseResponsePageQuestionSubmitVO_ = {
    code?: number;
    data?: PageQuestionSubmitVO_;
    msg?: string;
  };

  type BaseResponsePageQuestionVO_ = {
    code?: number;
    data?: PageQuestionVO_;
    msg?: string;
  };

  type BaseResponseQuestionAdminVO_ = {
    code?: number;
    data?: QuestionAdminVO;
    msg?: string;
  };

  type BaseResponseQuestionVO_ = {
    code?: number;
    data?: QuestionVO;
    msg?: string;
  };

  type CommentAddRequest = {
    content?: string;
    questionId?: number;
  };

  type CommentQueryRequest = {
    current?: number;
    pageSize?: number;
    questionId?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type CommentVO = {
    content?: string;
    createTime?: string;
    id?: number;
    userVO?: UserVO;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getQuestionByIdUsingGET1Params = {
    /** questionId */
    questionId: number;
  };

  type getQuestionByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getQuestionSubmitByIdUsingGETParams = {
    /** questionSubmitId */
    questionSubmitId: number;
  };

  type getQuestionVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type JudgeCase = {
    input?: string;
    output?: string;
  };

  type JudgeConfig = {
    memoryLimit?: number;
    stackLimit?: number;
    timeLimit?: number;
  };

  type JudgeInfo = {
    memory?: number;
    message?: string;
    time?: number;
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

  type PageCommentVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CommentVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageQuestion_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Question[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageQuestionSubmitVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: QuestionSubmitVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageQuestionVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: QuestionVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type Question = {
    acceptedNum?: number;
    answer?: string;
    content?: string;
    createTime?: string;
    favourNum?: number;
    id?: number;
    isDelete?: number;
    judgeCase?: string;
    judgeConfig?: string;
    submitNum?: number;
    tags?: string;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type QuestionAddRequest = {
    answer?: string;
    content?: string;
    judgeCase?: JudgeCase[];
    judgeConfig?: JudgeConfig;
    tags?: string[];
    title?: string;
  };

  type QuestionAdminVO = {
    acceptedNum?: number;
    answer?: string;
    content?: string;
    favourNum?: number;
    id?: number;
    judgeCase?: JudgeCase[];
    judgeConfig?: JudgeConfig;
    submitNum?: number;
    tags?: string[];
    thumbNum?: number;
    title?: string;
  };

  type QuestionEditRequest = {
    answer?: string;
    content?: string;
    id?: number;
    judgeCase?: JudgeCase[];
    judgeConfig?: JudgeConfig;
    tags?: string[];
    title?: string;
  };

  type QuestionFavourAddRequest = {
    questionId?: number;
  };

  type QuestionQueryRequest = {
    answer?: string;
    content?: string;
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type QuestionSubmit = {
    code?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    judgeInfo?: string;
    language?: string;
    questionId?: number;
    status?: number;
    updateTime?: string;
    userId?: number;
  };

  type QuestionSubmitAddRequest = {
    code?: string;
    language?: string;
    questionId?: number;
  };

  type QuestionSubmitQueryRequest = {
    current?: number;
    language?: string;
    pageSize?: number;
    questionId?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    userId?: number;
  };

  type QuestionSubmitVO = {
    code?: string;
    createTime?: string;
    id?: number;
    judgeInfo?: JudgeInfo;
    language?: string;
    questionId?: number;
    questionVO?: QuestionVO;
    status?: number;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
  };

  type QuestionThumbAddRequest = {
    questionId?: number;
  };

  type QuestionUpdateRequest = {
    answer?: string;
    content?: string;
    id?: number;
    judgeCase?: JudgeCase[];
    judgeConfig?: JudgeConfig;
    tags?: string[];
    title?: string;
  };

  type QuestionVO = {
    acceptedNum?: number;
    content?: string;
    createTime?: string;
    favour?: boolean;
    favourNum?: number;
    id?: number;
    judgeConfig?: JudgeConfig;
    submitNum?: number;
    tags?: string[];
    thumb?: boolean;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
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
