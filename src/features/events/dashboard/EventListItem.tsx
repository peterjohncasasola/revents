import {
  Button,
  Icon,
  Item,
  ItemGroup,
  Label,
  List,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import type { AppEvent, Attendee } from "types/event";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/app/router/AppRoutes";

type Props = {
  event: AppEvent;
};

export default function EventListItem({ event }: Props) {
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src={event.hostPhotoURL || "./user.png"}
            />
            <Item.Content>
              <Item.Header>{event.title}</Item.Header>
              <Item.Description>Hosted By: {event.hostedBy}</Item.Description>
              {event.isCancelled && (
                <Label
                  style={{ top: "-40px" }}
                  color="red"
                  ribbon='right'
                  content="This event has been cancelled"
                />
              )}
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {event.date}
          <Icon name="map marker alternate" /> {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees &&
            event.attendees.map((attendee: Attendee) => (
              <EventListAttendee key={attendee.id} attendee={attendee} />
            ))}
        </List>
      </Segment>
      <Segment>
        <span>{event.description}</span>
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={AppRoutes.EventDetails(event.id)}
          size="tiny"
          color="teal"
          icon="eye"
          floated="right"
          content="View"
        />
      </Segment>
    </SegmentGroup>
  );
}
