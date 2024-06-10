import React, {useState} from "react"
import { Input, Radio, Space } from 'antd';
import axios from "axios";


export const Exam = () => {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };



  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        <Radio value={1}>Option A</Radio>
        <Radio value={2}>Option B</Radio>
        <Radio value={3}>Option C</Radio>
      </Space>
    </Radio.Group>
  );
}