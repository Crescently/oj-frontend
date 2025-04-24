import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    questionList: {
      '.ant-list-item:first-child': { paddingTop: '0' },
    },
    listItemMetaTitle: {
      color: token.colorTextHeading,
    },
    description: {
      maxWidth: '720px',
      lineHeight: '22px',
    },
    extra: {
      marginTop: '16px',
      color: token.colorTextSecondary,
      lineHeight: '22px',
      '& > em': {
        marginLeft: '16px',
        color: token.colorTextDisabled,
        fontStyle: 'normal',
      },
      [`@media screen and (max-width: ${token.screenXS}px)`]: {
        '& > em': {
          display: 'block',
          marginTop: '8px',
          marginLeft: '0',
        },
      },
    },
  };
});

export default useStyles;
