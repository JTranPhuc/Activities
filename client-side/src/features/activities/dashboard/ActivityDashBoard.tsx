import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelActivity: () => void;
  onShowFormActivity: () => void;
  onHideFormActivity: () => void;
  isFormShown: boolean;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

const ActivityDashboard = ({
  activities,
  selectActivity,
  selectedActivity,
  cancelActivity,
  onShowFormActivity,
  onHideFormActivity,
  isFormShown,
  createOrEdit,
  deleteActivity,
  submitting,
}: Props) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !isFormShown && (
          <ActivityDetails
            activity={selectedActivity}
            cancelActivity={cancelActivity}
            onShowFormActivity={onShowFormActivity}
          />
        )}
        {isFormShown && (
          <ActivityForm
            onHideFormActivity={onHideFormActivity}
            selectedActivity={selectedActivity}
            createOrEdit={createOrEdit}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
