import { Button, Header, Item, Segment, Image } from "semantic-ui-react";

export default function EventDetailHeader() {

  const eventImageStyle = {
    filter: "brightness(30%)",
    height: "100%",
    objectFit: "cover",
  };

  const eventImageTextStyle = {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    color: "white",
    height: "auto",
    width: "100%"
  };

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src={`/categoryImages/drinks.jpg`} fluid style={eventImageStyle} />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content="Event Title"
                  style={{ color: "white" }}
                />
                <p>Event Date</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        <Button size="tiny">Cancel My Place</Button>
        <Button size="tiny" color="teal">Join this Event</Button>

        <Button color="orange" floated="right" size="tiny">
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
}
