/* eslint-disable react/jsx-props-no-spreading */
import React, { Component, createElement } from 'react';
import {
  Form,
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Mentions,
  Radio,
  Rate,
  Select,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
} from 'antd';
import { FormItemProps } from 'antd/es/form/FormItem';
import { ColProps } from 'antd/es/grid/col';

const FormItem = Form.Item;

const Components = {
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  Search: Input.Search,
  TextArea: Input.TextArea,
  Password: Input.Password,
  InputNumber,
  Mentions,
  Radio,
  Rate,
  Select,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
};

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
  component: keyof typeof Components;
  options?: {
    [key: string]: unknown;
  };
  rules: FormItemProps['rules'];
}

interface FormItemRenderProps {
  item: DefineFormItem;
  // eslint-disable-next-line react/require-default-props
  layout?: DefineFormItemLayout;
  // getFieldDecorator: WrappedFormUtils['getFieldDecorator'];
}
// 渲染单个表单项
const FormItemRender = ({
  item,
  layout,
}: // getFieldDecorator,
FormItemRenderProps): React.ReactElement => {
  const { label, key, required, component, options = {}, rules } = item;
  const valuePropName = ['Checkbox', 'Switch'].includes(component)
    ? 'checked'
    : 'value';
  return (
    <FormItem
      key={key}
      name={key}
      label={label}
      rules={rules || [{ required, message: `${label}为空` }]}
      valuePropName={valuePropName}
      {...options}
      {...layout}
    >
      {createElement(Components[component] as any, options)}
    </FormItem>
  );
};

export interface DefineFormProps {
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

  public render(): React.ReactElement[] {
    // items格式即为配置的表单项
    const { items, layout } = this.props;

    return (items || []).map(
      (item): React.ReactElement => (
        <FormItemRender key={item.key} {...{ item, layout }} />
      )
    );
  }
}

export default DefineForm;
