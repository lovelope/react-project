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
const FormItemRender = ({ item, layout, getFieldDecorator }) => {
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

FormItemRender.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.symbol]),
    label: PropTypes.string,
    required: PropTypes.bool,
    component: PropTypes.element,
    options: PropTypes.shape({}),
    rules: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  layout: PropTypes.shape({}).isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
};

@Form.create()
class DefineForm extends Component {
  static propTypes = {
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
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    layout: defaultFormItemLayout,
  };

  render() {
    // items格式即为配置的表单项
    const {
      items,
      layout,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form>
        {items.map(item => (
          <FormItemRender
            key={item.key}
            {...{ item, layout, getFieldDecorator }}
          />
        ))}
      </Form>
    );
  }
}

export default DefineForm;
