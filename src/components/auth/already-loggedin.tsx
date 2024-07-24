import { Link } from "@tanstack/react-router";
import { Button, Flex, Typography } from "antd";

const AlreadyLoggedin = ({
  onLogoutClick,
  username,
}: {
  onLogoutClick: () => void;
  username: string;
}) => {
  return (
    <Flex gap="24" vertical>
      <Typography.Paragraph>
        You loggedIn as
        <span className="ml-[8px] text-lg">{username}</span>
      </Typography.Paragraph>
      <Typography.Paragraph>
        Navigate to dashboard <Link to="/todos"> Navigate </Link>
      </Typography.Paragraph>
      <Button type="primary" onClick={onLogoutClick}>
        Log out
      </Button>
    </Flex>
  );
};

export default AlreadyLoggedin;
