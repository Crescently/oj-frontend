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

  type BaseResponseLoginUserVO = {
    code?: number;
    msg?: string;
    data?: LoginUserVO;
  };

  type BaseResponseLong = {
    code?: number;
    msg?: string;
    data?: number;
  };

  type BaseResponsePageQuestion = {
    code?: number;
    msg?: string;
    data?: PageQuestion;
  };

  type BaseResponsePageQuestionSubmitVO = {
    code?: number;
    msg?: string;
    data?: PageQuestionSubmitVO;
  };

  type BaseResponsePageQuestionVO = {
    code?: number;
    msg?: string;
    data?: PageQuestionVO;
  };

  type BaseResponsePageUser = {
    code?: number;
    msg?: string;
    data?: PageUser;
  };

  type BaseResponseQuestionAdminVO = {
    code?: number;
    msg?: string;
    data?: QuestionAdminVO;
  };

  type BaseResponseQuestionVO = {
    code?: number;
    msg?: string;
    data?: QuestionVO;
  };

  type BaseResponseString = {
    code?: number;
    msg?: string;
    data?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    msg?: string;
    data?: UserVO;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getQuestionByIdParams = {
    id: number;
  };

  type getQuestionVOByIdParams = {
    id: number;
  };

  type JudgeCase = {
    input?: string;
    output?: string;
  };

  type JudgeConfig = {
    timeLimit?: number;
    memoryLimit?: number;
    stackLimit?: number;
  };

  type JudgeInfo = {
    message?: string;
    memory?: number;
    time?: number;
  };

  type LoginUserVO = {
    id?: number;
    userAccount?: string;
    userRole?: string;
    username?: string;
    userEmail?: string;
    userPic?: string;
    description?: string;
    createTime?: string;
    updateTime?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageQuestion = {
    records?: Question[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageQuestionSubmitVO = {
    records?: QuestionSubmitVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageQuestionVO = {
    records?: QuestionVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUser = {
    records?: User[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type Question = {
    id?: number;
    title?: string;
    content?: string;
    tags?: string;
    answer?: string;
    submitNum?: number;
    acceptedNum?: number;
    judgeCase?: string;
    judgeConfig?: string;
    thumbNum?: number;
    favourNum?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type QuestionAddRequest = {
    title?: string;
    content?: string;
    tags?: string[];
    answer?: string;
    judgeCase?: JudgeCase[];
    judgeConfig?: JudgeConfig;
  };

  type QuestionAdminVO = {
    id?: number;
    title?: string;
    content?: string;
    tags?: string[];
    answer?: string;
    submitNum?: number;
    acceptedNum?: number;
    judgeCase?: JudgeCase[];
    judgeConfig?: JudgeConfig;
    thumbNum?: number;
    favourNum?: number;
  };

  type QuestionEditRequest = {
    id?: number;
    title?: string;
    content?: string;
    tags?: string[];
    answer?: string;
    judgeCase?: JudgeCase[];
    judgeConfig?: JudgeConfig;
  };

  type QuestionQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    title?: string;
    content?: string;
    tags?: string[];
    answer?: string;
    userId?: number;
  };

  type QuestionSubmitAddRequest = {
    language?: string;
    code?: string;
    questionId?: number;
  };

  type QuestionSubmitQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    language?: string;
    status?: number;
    questionId?: number;
    userId?: number;
  };

  type QuestionSubmitVO = {
    id?: number;
    language?: string;
    code?: string;
    judgeInfo?: JudgeInfo;
    status?: number;
    questionId?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    userVO?: UserVO;
    questionVO?: QuestionVO;
  };

  type QuestionUpdateRequest = {
    id?: number;
    title?: string;
    content?: string;
    tags?: string[];
    answer?: string;
    judgeCase?: JudgeCase[];
    judgeConfig?: JudgeConfig;
  };

  type QuestionVO = {
    id?: number;
    title?: string;
    content?: string;
    tags?: string[];
    submitNum?: number;
    acceptedNum?: number;
    judgeConfig?: JudgeConfig;
    thumbNum?: number;
    favourNum?: number;
    userId?: number;
    userVO?: UserVO;
    createTime?: string;
    updateTime?: string;
  };

  type User = {
    id?: number;
    userAccount?: string;
    userPassword?: string;
    userRole?: string;
    username?: string;
    userEmail?: string;
    userPic?: string;
    description?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
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

  type UserUpdateAvatarRequest = {
    avatarUrl?: string;
    userId?: number;
  };

  type UserUpdateInfoRequest = {
    id?: number;
    username: string;
    userEmail: string;
  };

  type UserUpdatePwdRequest = {
    userId?: number;
    oldPassword: string;
    newPassword: string;
    rePassword: string;
  };

  type UserVO = {
    id?: number;
    userAccount?: string;
    username?: string;
    userEmail?: string;
    userRole?: string;
    userPic?: string;
    description?: string;
  };
}
