import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";

const ActivityForm = () => {
  const { activityStore } = useStore();
  const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore;

  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);
  const handlerSubmit = () => {
    activity.id ? updateActivity(activity) : createActivity(activity);
  };

  const handlerInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

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
        <Button floated="left" positive type="button" content="Cancel" onClick={closeForm} />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
