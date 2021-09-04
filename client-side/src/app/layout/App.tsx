import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashBoard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >();
  const [isFormShown, setIsFormShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  function handlerSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }

  function handlerCancelActivity() {
    setSelectedActivity(undefined);
  }

  function showFormActivityHandler(id?: string) {
    id ? handlerSelectActivity(id) : handlerCancelActivity();
    setIsFormShown(true);
  }

  function hideFormActivityHandler() {
    setIsFormShown(false);
  }

  function handlerCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id !== "") {
      agent.activities.update(activity).then(() => {
        const filterListActivities = activities.filter(
          (x) => x.id !== activity.id
        );
        setActivities([...filterListActivities, activity]);
        setSelectedActivity(activity);
        setIsFormShown(false);
        setSubmitting(false);
      });
    } else {
      agent.activities.create(activity).then(() => {
        setActivities([...activities, { ...activity, id: uuid() }]);
        setIsFormShown(false);
        setSubmitting(false);
      });
    }
  }

  function handlerDeleteActivity(id: string) {
    setSubmitting(true);
    agent.activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  useEffect(() => {
    agent.activities.list().then((response: Activity[]) => {
      let activities: Activity[] = [];
      response.forEach((act) => {
        act.date = act.date.split("T")[0];
        activities.push(act);
      });
      setActivities(response);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingComponent content="Loading data" />;
  }

  return (
    <Fragment>
      <Navbar onShowFormActivity={showFormActivityHandler} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handlerSelectActivity}
          cancelActivity={handlerCancelActivity}
          onShowFormActivity={showFormActivityHandler}
          onHideFormActivity={hideFormActivityHandler}
          isFormShown={isFormShown}
          createOrEdit={handlerCreateOrEditActivity}
          deleteActivity={handlerDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
