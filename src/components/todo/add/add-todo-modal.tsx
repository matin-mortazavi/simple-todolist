import { Modal } from "antd";
import AddTodoForm from "./add-todo-form";

const AddTodoModal = ({
  isOpen,
  onCancel,
}: {
  isOpen: boolean;
  onCancel: () => void;
}) => {
  return (
    <Modal open={isOpen} onCancel={onCancel} onClose={onCancel} footer={null}>
      <AddTodoForm onClose={onCancel} />
    </Modal>
  );
};

export default AddTodoModal;
