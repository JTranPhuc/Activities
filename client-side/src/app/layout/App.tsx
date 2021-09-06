import { Fragment } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashBoard";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router";
import HomePage from "../../features/home/Homepage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

function App() {
  const location = useLocation();
  return (
    <Fragment>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <Route path="/" component={HomePage} exact />
        <Route path="/activities" component={ActivityDashboard} exact />
        <Route path="/activities/:id" component={ActivityDetails} />
        <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
      </Container>
    </Fragment>
  );
}

export default observer(App);
