import { Text } from "../dawn-ui";
import Link from "../dawn-ui/components/Link";
import Navbar from "../dawn-ui/components/Navbar";

export default function SyNavbar() {
  return (
    <Navbar>
        <Text type="navbar">
          <Link href="/">
            Syrenity
          </Link>
        </Text>
      </Navbar>
  );
}