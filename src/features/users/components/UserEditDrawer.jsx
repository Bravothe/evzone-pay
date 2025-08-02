import React, { useEffect } from 'react';
import {
  Drawer,
  Form,
  Input,
  Select,
  Avatar,
  Space,
  Button,
  Spin,
} from 'antd';
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiLayers,
  FiShield,
  FiCheckCircle,
} from 'react-icons/fi';
import {
  ROLE_OPTIONS,
  STATUS_OPTIONS,
  BRANCH_OPTIONS,
  DEPT_OPTIONS,
} from '../constants';
import 'antd/dist/reset.css';

const { Option } = Select;

export default function UserEditDrawer({ user, visible, onClose, onSave }) {
  const [form] = Form.useForm();

  // Whenever we open or switch users, reset the form
  useEffect(() => {
    if (user && visible) {
      form.setFieldsValue({
        name:       user.name,
        email:      user.email,
        branch:     user.branch,
        department: user.department,
        roles:      user.roles,
        status:     user.status,
      });
    } else {
      form.resetFields();
    }
  }, [user, visible, form]);

  const handleFinish = values => {
    onSave({ ...user, ...values });
    onClose();
  };

  return (
    <Drawer
      title={
        user ? (
          <Space align="center">
            <Avatar
              size="large"
              src={user.photo}
              icon={<FiUser />}
            />
            <span className="text-lg font-semibold">{user.name}</span>
          </Space>
        ) : (
          <Space align="center">
            <Spin />
            <span>Loading…</span>
          </Space>
        )
      }
      placement="right"
      open={visible}
      onClose={onClose}
      width={400}
      destroyOnClose
      footer={
        <div style={{ textAlign: 'right' }}>
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" icon={<FiCheckCircle />} onClick={() => form.submit()}>
              Save
            </Button>
          </Space>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label={<><FiUser /> Name</>}
          rules={[{ required: true, message: 'Please enter a name' }]}
        >
          <Input placeholder="Full name" />
        </Form.Item>

        <Form.Item
          name="email"
          label={<><FiMail /> Email</>}
          rules={[
            { required: true, message: 'Please enter an email' },
            { type: 'email', message: 'Invalid email address' },
          ]}
        >
          <Input placeholder="user@example.com" />
        </Form.Item>

        <Form.Item
          name="branch"
          label={<><FiMapPin /> Branch</>}
          rules={[{ required: true, message: 'Select a branch' }]}
        >
          <Select
            placeholder="Select branch"
            showSearch
            optionFilterProp="label"
            allowClear
          >
            {BRANCH_OPTIONS.map(o => (
              <Option key={o.value} value={o.value} label={o.label}>
                {o.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="department"
          label={<><FiLayers /> Department</>}
          rules={[{ required: true, message: 'Select a department' }]}
        >
          <Select
            placeholder="Select department"
            showSearch
            optionFilterProp="label"
            allowClear
          >
            {DEPT_OPTIONS.map(o => (
              <Option key={o.value} value={o.value} label={o.label}>
                {o.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="roles"
          label={<><FiShield /> Roles</>}
          rules={[{ required: true, message: 'Select at least one role' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select roles"
            showSearch
            optionFilterProp="label"
            allowClear
          >
            {ROLE_OPTIONS.map(o => (
              <Option key={o.value} value={o.value} label={o.label}>
                {o.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Select a status' }]}
        >
          <Select placeholder="Select status" allowClear>
            {STATUS_OPTIONS.map(o => (
              <Option key={o.value} value={o.value}>
                {o.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
