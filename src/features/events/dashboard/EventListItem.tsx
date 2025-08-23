import { Button, Icon, Item, ItemGroup, List, Segment, SegmentGroup } from 'semantic-ui-react';
import EventListAttendee from "./EventListAttendee";
import type { AppEvent, Attendee } from 'types/event';
import { Link } from 'react-router-dom';
import { AppRoutes } from '@/app/router/AppRoutes';

type Props = {
  event: AppEvent
}

export default function EventListItem({event}: Props) {
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL || './user.png'} />
            <Item.Content>
              <Item.Header>{event.title}</Item.Header>
              <Item.Description>{event.hostedBy}</Item.Description>
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {event.date}
          <Icon name='map marker alternate' /> {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
            {event.attendees && event.attendees.map((attendee: Attendee) => (
              <EventListAttendee key={attendee.id} attendee={attendee} />
            ))}
        </List>
      </Segment>
      <Segment >
        <span>{event.description}</span>
      </Segment>
      <Segment clearing>
        <Button size='small' color='red' floated='right' content='Delete' />
        <Button as={Link} to={AppRoutes.EventDetails(event.id)} size='small' color='teal' floated='right' content='View' />
      </Segment>
    </SegmentGroup>
  )
}