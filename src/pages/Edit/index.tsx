import React, { Component } from 'react';
import moment, { Moment } from 'moment';
import { Button } from 'antd';

import DefineForm, {
  defaultLabelColSpan,
  DefineFormProps,
} from '@/components/DefineForm/index.tsx';

// formItems即为表单的配置项
// @ts-ignore
import formItems from './customFormItems.tsx';

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

class Edit extends Component {
  // form instance
  private formRef: React.ReactComponentElement<
    typeof DefineForm,
    DefineFormProps
  > | null;

  public constructor(props) {
    super(props);
    this.formRef = null;
  }

  private handleGetDetail = (): void => {
    requestDetail().then((res: DefineData): void => {
      // 如果字段的值是日期，要先转成moment格式
      res.DatePicker = moment(res.DatePicker);
      res.RangePicker = [
        moment(res.RangePicker[0]),
        moment(res.RangePicker[1]),
      ];
      if (this.formRef) {
        this.formRef.props.form.setFieldsValue(res);
      }
    });
  };

  private handleSubmit = (): void => {
    if (this.formRef) {
      this.formRef.props.form.validateFieldsAndScroll((err, values): void => {
        console.info(values);
        if (err) {
          return;
        }
        console.info('校验通过');
      });
    }
  };

  public render(): React.ReactElement {
    return (
      <div>
        <Button
          style={{ margin: 24 }}
          type="primary"
          onClick={this.handleGetDetail}
        >
          模拟请求数据然后设置表单值
        </Button>

        <DefineForm
          wrappedComponentRef={(node): void => {
            this.formRef = node;
          }}
          items={formItems}
        />

        <Button
          style={{ marginLeft: `${(defaultLabelColSpan / 24) * 100}%` }}
          type="primary"
          onClick={this.handleSubmit}
        >
          提交
        </Button>
      </div>
    );
  }
}

export default Edit;
