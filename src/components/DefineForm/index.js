import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

// 默认的layout
export const defaultLabelColSpan = 6;
const defaultFormItemLayout = {
  labelCol: { span: defaultLabelColSpan },
  wrapperCol: { span: 14 },
};

// 渲染单个表单项
const renderFormItem = ({ item, layout, getFieldDecorator }) => {
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

class DefineForm extends Component {
  render() {
    // items格式即为配置的表单项
    const {
      items,
      layout,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form>
        {items.map(item => renderFormItem({ item, layout, getFieldDecorator }))}
      </Form>
    );
  }
}

DefineForm.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      required: PropTypes.bool,
      component: PropTypes.element,
      rules: PropTypes.arrayOf(PropTypes.shape({})),
      options: PropTypes.shape({}),
    })
  ).isRequired,
  layout: PropTypes.shape({}),
  form: PropTypes.shape({}).isRequired,
};

DefineForm.defaultProps = {
  layout: defaultFormItemLayout,
};

export default Form.create()(DefineForm);
