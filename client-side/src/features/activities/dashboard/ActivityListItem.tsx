import { format } from "date-fns/esm";
// import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
// import { useStore } from "../../../app/store/store";

interface Props {
  activity: Activity;
}

const ActivityListItem = ({ activity: act }: Props) => {
  // const [target, setTarget] = useState("");
  // const { activityStore } = useStore();
  // const { loading, deleteActivity } = activityStore;

  // const deleteSelectedActivity = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
  //   setTarget(e.currentTarget.name);
  //   deleteActivity(id);
  // };

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${act.id}`}>
                {act.title}
              </Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment>
        <span>
          <Icon name="clock" />
          {format(act.date!, "dd MMM yyyy h:mm aa")}
          <Icon name="marker" />
          {act.venue}
        </span>
      </Segment>
      <Segment secondary>Attendees go here</Segment>
      <Segment clearing>
        <span>{act.description}</span>
        <Button as={Link} to={`/activities/${act.id}`} color="teal" floated="right" content="View" />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
