import React from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';

const plugins = [gfm(), highlight()];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const MdEditor: React.FC<Props> = ({ value = '', onChange = () => {} }) => {
  return (
    <div>
      <Editor value={value} plugins={plugins} onChange={onChange} />
    </div>
  );
};

export default MdEditor;
