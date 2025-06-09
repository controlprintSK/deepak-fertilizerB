import { usePageAccess } from "@/utils/common";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Switch } from "antd";

// Add Button
export const AddButton = ({
  pageId,
  rightId,
  _href,
  text,
  _function,
  _size,
}) => {
  const hasAccess = usePageAccess(pageId, [rightId]);

  return hasAccess ? (
    <Button
      type="primary"
      icon={<PlusCircleOutlined />}
      onClick={_function}
      size={_size}
      href={_href}
    >
      {text}
    </Button>
  ) : null;
};

// Edit Button only icon
export const EditButton = ({ pageId, rightId, _function, _type, _size }) => {
  const hasAccess = usePageAccess(pageId, [rightId]);
  return hasAccess ? (
    <Button
      onClick={_function}
      icon={<EditOutlined />}
      type={_type}
      size={_size}
    />
  ) : null;
};

// Delete Button only icon
export const DeleteButton = ({ pageId, rightId, _function, _type, _size }) => {
  const hasAccess = usePageAccess(pageId, [rightId]);
  return hasAccess ? (
    <Popconfirm title="Sure to delete?" onConfirm={_function}>
      <Button type={_type} icon={<DeleteOutlined />} size={_size} danger />
    </Popconfirm>
  ) : null;
};

// Delete Button only icon
export const SwitchButton = ({
  pageId,
  rightId,
  _function,
  _checkedText,
  _uncheckedText,
  _checked,
  _disabled,
}) => {
  const hasAccess = usePageAccess(pageId, [rightId]);
  return hasAccess ? (
    <Popconfirm title="Are you sure?" onConfirm={_function}>
      <Switch
        checkedChildren={_checkedText}
        unCheckedChildren={_uncheckedText}
        checked={_checked}
        disabled={_disabled || false}
      />
    </Popconfirm>
  ) : null;
};
