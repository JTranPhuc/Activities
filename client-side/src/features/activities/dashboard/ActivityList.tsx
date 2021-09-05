import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";

const ActivityList = () => {
  const [target, setTarget] = useState("");
  const { activityStore } = useStore();
  const { activityByDate, loading, deleteActivity } = activityStore;

  const deleteSelectedActivity = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };

  return (
    <Segment>
      <Item.Group divided>
        {activityByDate.map((act) => (
          <Item key={act.id}>
            <Item.Content>
              <Item.Header as="a">{act.title}</Item.Header>
              <Item.Meta>{act.date}</Item.Meta>
              <Item.Description>
                <div>{act.description}</div>
                <div>
                  {act.city}, {act.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button onClick={() => activityStore.selectActivity(act.id)} floated="right" content="View" color="blue"></Button>
                <Button onClick={(e) => deleteSelectedActivity(e, act.id)} floated="right" content="Delete" color="red" loading={loading && target === act.id} name={act.id}></Button>
                <Label basic content={act.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
export default observer(ActivityList);
