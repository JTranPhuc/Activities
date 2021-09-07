import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";
import ActivityListItem from "./ActivityListItem";

const ActivityList = () => {
  const { activityStore } = useStore();
  const { groupActivitiesByDate } = activityStore;

  return (
    <Fragment>
      {groupActivitiesByDate.map(([group, activities]) => {
        return (
          <Fragment key={group}>
            <Header sub color="teal">
              {group}
            </Header>
            {activities.map((act) => (
              <ActivityListItem activity={act} key={act.id} />
            ))}
          </Fragment>
        );
      })}
    </Fragment>
  );
};
export default observer(ActivityList);
