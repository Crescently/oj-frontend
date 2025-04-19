import React from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import zhHans from 'bytemd/locales/zh_Hans.json';
import './index.css';

const plugins = [gfm(), highlight()];

interface Props {
  value?: string | undefined;
  onChange?: (value: string) => void;
}

const MdEditor: React.FC<Props> = ({ value = '', onChange = () => {} }) => {
  return (
    <div style={{ minWidth: '800px' }}>
      <Editor
        value={value}
        plugins={plugins}
        onChange={onChange}
        mode={'split'}
        locale={zhHans}
        placeholder={'请输入内容...'}
      />
    </div>
  );
};

export default MdEditor;
