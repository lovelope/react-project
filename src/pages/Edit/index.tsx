import React, { useRef } from 'react';
import moment, { Moment } from 'moment';
import { Button, Form } from 'antd';
import { useForm } from 'antd/es/form/Form';

import DefineForm, { defaultLabelColSpan } from '@/components/DefineForm';

// formItems即为表单的配置项
import formItems from './customFormItems';

interface DefineData {
  Input: string;
  password: string;
  Select: string;
  RadioGroup: string;
  RadioButtonGroup: string;
  CheckboxGroup: string[];
  DatePicker: string | Moment;
  RangePicker: [string, string] | [Moment, Moment];
  Switch: boolean;
}
const resData: DefineData = {
  Input: 'Input',
  password: 'password',
  Select: 'option2',
  RadioGroup: 'radio2',
  RadioButtonGroup: 'radio2',
  CheckboxGroup: ['checkbox2'],
  DatePicker: '2018-05-15T13:36:27.132Z',
  RangePicker: ['2018-04-15T13:36:27.132Z', '2018-05-15T13:36:27.132Z'],
  Switch: true,
};

// 模拟发请求（在做修改操作时，表单需要先填充已有数据，这里写了个假的获取详情接口）
const requestDetail = (): Promise<DefineData> =>
  new Promise((resolve): void => {
    setTimeout((): void => {
      resolve(resData);
    }, 1500);
  });

const Edit: React.FC = () => {
  const [form] = useForm();

  const handleGetDetail = (): void => {
    requestDetail().then((res: DefineData): void => {
      // 如果字段的值是日期，要先转成moment格式
      res.DatePicker = moment(res.DatePicker);
      res.RangePicker = [
        moment(res.RangePicker[0]),
        moment(res.RangePicker[1]),
      ];
      if (form) {
        form.setFieldsValue(res);
      }
    });
  };

  const handleFinish = (values): void => {
    console.info(values);
  };

  const handleFinishFailed = (errorInfo): void => {
    console.error(errorInfo);
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
    >
      <Button style={{ margin: 24 }} type="primary" onClick={handleGetDetail}>
        模拟请求数据然后设置表单值
      </Button>

      <DefineForm items={formItems as any} />

      <Button
        style={{ marginLeft: `${(defaultLabelColSpan / 24) * 100}%` }}
        type="primary"
        htmlType="submit"
      >
        提交
      </Button>
    </Form>
  );
};

export default Edit;
