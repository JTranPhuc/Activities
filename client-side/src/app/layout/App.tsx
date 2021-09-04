import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashBoard";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >();
  const [isFormShown, setIsFormShown] = useState(false);

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
    if (activity.id !== "") {
      const filterListActivities = activities.filter(
        (x) => x.id !== activity.id
      );

      setActivities([...filterListActivities, activity]);
    } else {
      setActivities([...activities, { ...activity, id: uuid() }]);
    }
    setIsFormShown(false);
    setSelectedActivity(activity);
  }

  function handlerDeleteActivity(id: string) {
    setActivities([...activities.filter((x) => x.id !== id)]);
  }

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

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
        />
      </Container>
    </Fragment>
  );
}

export default App;
