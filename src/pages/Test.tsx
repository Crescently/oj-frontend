import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import {CodeEditor, MdEditor, MyDivider} from '@/components';

const Test: React.FC = () => {
  const [value, setValue] = useState('');
  const onChange = () => {
    setValue(value);
  };

  const handleEditorChange = (value: string | undefined) => {
    console.log(value);
  };
  return (
    <PageContainer title={'test'}>
      <MdEditor value={value} onChange={onChange} />
      <MyDivider height={32} />

      <CodeEditor value={value} handleEditorChange={handleEditorChange} />
    </PageContainer>
  );
};

export default Test;
