import React from 'react';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';

const plugins = [gfm(), highlight()];

interface Props {
  value: string | undefined;
}

const MdViewer: React.FC<Props> = ({ value = '' }) => {
  return (
    <div>
      <Viewer value={value} plugins={plugins} />
    </div>
  );
};

export default MdViewer;
