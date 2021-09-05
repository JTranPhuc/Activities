import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/store/store";

const ActivityDetails = () => {
  const { activityStore } = useStore();
  const { selectedActivity: activity, openForm, cancelSelected } = activityStore;

  if (!activity) return <LoadingComponent />;

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
          <Button onClick={() => openForm(activity.id)} basic color="blue" content="Edit" />
          <Button basic color="grey" content="Cancel" onClick={cancelSelected} />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
