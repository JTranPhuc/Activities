import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/store/store";
import ActivityFilter from "./ActivityFilter";
import ActivityList from "./ActivityList";

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { loadingInitial, activityRegistry } = activityStore;
  useEffect(() => {
    if (activityRegistry.size <= 1) {
      activityStore.loadActivities();
    }
  }, [activityStore, activityRegistry]);

  if (loadingInitial) {
    return <LoadingComponent content="Loading data" />;
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilter />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
