import Column from "../dawn-ui/components/Column";
import Icon from "../dawn-ui/components/Icon";
import Row from "../dawn-ui/components/Row";
import Message from "../syrenity-client/structures/Message";

export default function MessageC({message}: {message: Message}) {
  return (
    <Column util={["no-shrink"]}>
      <Icon size="48px" src="" fallback="/images/logos/no_shape_logo.png" />
      <Row util={["flex-grow"]} style={{gap:"5px"}}>
        <Column util={["align-center"]} style={{gap: "10px"}}>
          <b>{message.authorId}</b>
          <small>{message.createdAt.toLocaleString()}</small>
        </Column>
        <label>{message.content}</label>
      </Row>
    </Column>
  );
}