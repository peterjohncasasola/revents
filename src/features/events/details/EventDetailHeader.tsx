import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { type AppEvent } from "@/types/event";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/app/router/AppRoutes";

type Props= {
  event: AppEvent
}

export default function EventDetailHeader({ event }: Props) {

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
        <Image src={`/categoryImages/${event.category}.jpg`} fluid style={eventImageStyle} />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: "white" }}
                />
                <p>{event.date}</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        <Button size="tiny">Cancel My Place</Button>
        <Button size="tiny" color="teal">Join this Event</Button>

        <Button color="orange" floated="right" size="tiny" as={Link} to={AppRoutes.ManageEvent(event.id)}>
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
}
