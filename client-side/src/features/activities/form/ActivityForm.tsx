import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/store/store";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

const ActivityForm = () => {
  const { activityStore } = useStore();
  const history = useHistory();
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams<{ id: string }>();

  const [activity, setActivity] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((act: Activity | undefined) => {
        setActivity(act!);
      });
    }
  }, [id, loadActivity]);

  const handlerSubmit = () => {
    if (activity.id.length === 0) {
      const act = {
        ...activity,
        id: uuid(),
      };
      createActivity(act).then(() => {
        history.push(`/activities/${act.id}`);
      });
    } else {
      updateActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  };

  const handlerInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Segment clearing>
      <Form onSubmit={handlerSubmit} autoComplete="off">
        <Form.Input placeholder="Title" value={activity.title} onChange={handlerInputChange} name="title" />
        <Form.TextArea placeholder="Description" value={activity.description} onChange={handlerInputChange} name="description" />
        <Form.Input placeholder="Category" value={activity.category} onChange={handlerInputChange} name="category" />
        <Form.Input placeholder="Date" value={activity.date} onChange={handlerInputChange} name="date" type="date" />
        <Form.Input placeholder="City" value={activity.city} onChange={handlerInputChange} name="city" />
        <Form.Input placeholder="Venue" value={activity.venue} onChange={handlerInputChange} name="venue" />
        <Button floated="right" positive type="submit" content="Submit" loading={loading} />
        <Button as={Link} to="/activities" floated="left" positive type="button" content="Cancel" />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
