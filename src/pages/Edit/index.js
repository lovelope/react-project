import React, { Component } from 'react';
import moment from 'moment';
import { Button } from 'antd';
import DefineForm, { defaultLabelColSpan } from '@/components/DefineForm';
import autobind from '@/utils/autobind';
// formItems即为表单的配置项
import formItems from './customFormItems';

// 模拟发请求（在做修改操作时，表单需要先填充已有数据，这里写了个假的获取详情接口）
const requestDetail = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        Input: 'Input',
        password: 'password',
        Select: 'option2',
        RadioGroup: 'radio2',
        RadioButtonGroup: 'radio2',
        CheckboxGroup: ['checkbox2'],
        DatePicker: '2018-05-15T13:36:27.132Z',
        RangePicker: ['2018-04-15T13:36:27.132Z', '2018-05-15T13:36:27.132Z'],
        Switch: true,
      });
    }, 1500);
  });

class Edit extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
  }

  @autobind
  handleGetDetail() {
    requestDetail().then(res => {
      // 如果字段的值是日期，要先转成moment格式
      res.DatePicker = moment(res.DatePicker);
      res.RangePicker = res.RangePicker.map(d => moment(d));
      this.formRef.setFieldsValue(res);
    });
  }

  @autobind
  handleSubmit() {
    this.formRef.validateFieldsAndScroll((err, values) => {
      console.info(values);
      if (err) {
        return;
      }
      console.info('校验通过');
    });
  }

  render() {
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
          ref={node => {
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
