import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activityRegistry: Map<string, Activity> = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get activityByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = async () => {
    try {
      await agent.activities.list().then((res) => {
        res.forEach((act) => {
          act.date = act.date.split("T")[0];
          this.activityRegistry.set(act.id, act);
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

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
  };

  cancelSelected = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelected();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };
}
