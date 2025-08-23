import { List, Item } from "semantic-ui-react";
import type { Attendee } from "types/event";

type Props = {
  attendee: Attendee
}

export default function EventListAttendee({attendee}: Props) {
  return (
    <List.Item>
          <Item.Image size='mini' circular src={attendee.photoURL || './user.png'} />
    </List.Item>
  )
}