/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { ValidationRule, WrappedFormUtils } from 'antd/es/form/Form';
import { ColProps } from 'antd/es/grid/col';

const FormItem = Form.Item;

interface DefineFormItemLayout {
  labelCol?: ColProps;
  wrapperCol?: ColProps;
}
// 默认的layout
export const defaultLabelColSpan = 6;
const defaultFormItemLayout: DefineFormItemLayout = {
  labelCol: { span: defaultLabelColSpan },
  wrapperCol: { span: 14 },
};

export interface DefineFormItem {
  key: string;
  label?: string;
  required?: boolean;
  component?: React.ReactElement;
  options?: {
    [key: string]: unknown;
  };
  rules?: ValidationRule[];
}

interface FormItemRenderProps {
  item: DefineFormItem;
  layout?: DefineFormItemLayout;
  getFieldDecorator: WrappedFormUtils['getFieldDecorator'];
}
// 渲染单个表单项
const FormItemRender = ({
  item,
  layout,
  getFieldDecorator,
}: FormItemRenderProps): React.ReactElement => {
  const { label, key, required, component, options = {}, rules } = item;
  return (
    <FormItem key={key} label={label} {...layout}>
      {getFieldDecorator(key, {
        ...options,
        rules: rules || [{ required, message: `${label}为空` }],
      })(component || <Input />)}
    </FormItem>
  );
};

export interface DefineFormProps {
  form: WrappedFormUtils;
  wrappedComponentRef?: unknown;
  items: DefineFormItem[];
  layout?: DefineFormItemLayout;
}

// antd form need get component instance by using class component
// eslint-disable-next-line react/prefer-stateless-function
class DefineForm extends Component<DefineFormProps> {
  // eslint-disable-next-line react/static-property-placement
  public static readonly defaultProps: { layout: DefineFormItemLayout } = {
    layout: defaultFormItemLayout,
  };

  public render(): React.ReactElement {
    // items格式即为配置的表单项
    const {
      items,
      layout,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form>
        {(items || []).map(
          (item): React.ReactElement => (
            <FormItemRender
              key={item.key}
              {...{ item, layout, getFieldDecorator }}
            />
          )
        )}
      </Form>
    );
  }
}

export default Form.create<DefineFormProps>()(DefineForm);
