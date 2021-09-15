import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/store/store";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelect from "../../../app/common/form/MySelect";
import { CategoryOptions } from "../../../app/common/options/CategoryOptions";
import MyDatePicker from "../../../app/common/form/MyDatePicker";

const ActivityForm = () => {
  const { activityStore } = useStore();
  const history = useHistory();
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams<{ id: string }>();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    description: Yup.string().required(),
    category: Yup.string().required(),
    date: Yup.string().required("Date is required"),
    city: Yup.string().required(),
    venue: Yup.string().required(),
  });

  const submitFormActivity = (activity: Activity) => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    } else {
      updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    }
  };

  useEffect(() => {
    if (id) {
      loadActivity(id).then((act: Activity | undefined) => {
        setActivity(act!);
      });
    }
  }, [id, loadActivity]);

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={submitFormActivity}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput placeholder="Title" name="title" />
            <MyTextArea rows={7} placeholder="Description" name="description" />
            <MySelect options={CategoryOptions} placeholder="Category" name="category" />
            <MyDatePicker showTimeSelect timeCaption="time" dateFormat="MMMM d, yyyy, h:mm aa" placeholderText="Date" name="date" />

            <Header content="Location Details" sub color="teal" />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button floated="right" positive type="submit" content="Submit" loading={loading} disabled={isSubmitting || (!dirty && !isValid)} />
            <Button as={Link} to="/activities" floated="left" positive type="button" content="Cancel" />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
