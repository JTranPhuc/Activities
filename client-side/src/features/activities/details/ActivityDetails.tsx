import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
  cancelActivity: () => void;
  onShowFormActivity: (id:string) => void;
}

const ActivityDetails = ({
  activity,
  cancelActivity,
  onShowFormActivity,
}: Props) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="3">
          <Button
            onClick={()=>onShowFormActivity(activity.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={cancelActivity}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
