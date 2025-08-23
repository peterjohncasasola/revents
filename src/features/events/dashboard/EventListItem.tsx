import { Button, Icon, Item, ItemGroup, List, Segment, SegmentGroup } from 'semantic-ui-react';
import EventListAttendee from "./EventListAttendee";
import type { AppEvent, Attendee } from 'types/event';

type Props = {
  event: AppEvent
  onSelectEvent: (event: AppEvent) => void
  onRemoveEvent: (event: AppEvent) => void
}

export default function EventListItem({event, onSelectEvent, onRemoveEvent}: Props) {
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
        <Button size='small' color='red' floated='right' content='Delete' onClick={() => onRemoveEvent(event)} />
        <Button size='small' color='teal' floated='right' content='View' onClick={() => onSelectEvent(event)} />
      </Segment>
    </SegmentGroup>
  )
}