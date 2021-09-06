import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activityRegistry: Map<string, Activity> = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activityByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      await agent.activities.list().then((res) => {
        res.forEach((act) => {
          this.setActivity(act);
        });
        this.setLoadingInitial(false);
      });
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  createActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      activity.id = uuid();
      await agent.activities.create(activity).then(() => {
        runInAction(() => {
          this.activityRegistry.set(activity.id, activity);
          this.loading = false;
          this.editMode = false;
        });
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
        this.editMode = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.activities.update(activity).then(() => {
        runInAction(() => {
          this.activityRegistry.set(activity.id, activity);
          this.loading = false;
          this.editMode = false;
        });
      });
    } catch (error) {
      console.log(false);
      runInAction(() => {
        this.loading = false;
        this.editMode = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.activities.delete(id).then(() => {
        this.loading = false;
        this.activityRegistry.delete(id);
      });
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  loadActivity = async (id: string) => {
    this.setLoadingInitial(true);
    let activity = this.getActivity(id);
    if (activity) {
      runInAction(() => {
        this.selectedActivity = activity;
      });
      this.setLoadingInitial(false);
      return activity;
    } else {
      this.setLoadingInitial(true);
      try {
        activity = await agent.activities.details(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
        });
        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    this.activityRegistry.set(activity.id, activity);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
}
