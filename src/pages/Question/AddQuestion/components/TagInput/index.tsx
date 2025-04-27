import React, { FC, useState } from 'react';
import { Button, Input, Popover, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface TagInputProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}

const TagInput: FC<TagInputProps> = ({ value = [], onChange }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleAddClick = () => {
    setInputVisible(true);
  };

  const handleInputConfirm = () => {
    const newValue = inputValue.trim();
    if (newValue && !value.includes(newValue)) {
      onChange?.([...value, newValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleTagClose = (removedTag: string) => {
    const newTags = value.filter((tag) => tag !== removedTag);
    onChange?.(newTags);
  };

  const popoverContent = (
    <div style={{ display: 'flex', gap: 8 }}>
      <Input
        autoFocus
        style={{ width: 160 }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={handleInputConfirm}
      />
      <Button type="primary" size="small" onClick={handleInputConfirm}>
        添加
      </Button>
    </div>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center',
      }}
    >
      {value.map((tag) => (
        <Tag
          closable
          key={tag}
          color={'green'}
          onClose={() => handleTagClose(tag)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 12px',
            minHeight: '16px',
            borderRadius: '4px',
            margin: '4px 8px 4px 0',
            fontSize: '14px',
          }}
        >
          {tag}
        </Tag>
      ))}

      <Popover
        open={inputVisible}
        content={popoverContent}
        trigger="click"
        onOpenChange={(visible) => {
          if (!visible) {
            setInputVisible(false);
            setInputValue('');
          }
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddClick}
          style={{
            height: 30,
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          新增标签
        </Button>
      </Popover>
    </div>
  );
};

export default TagInput;
