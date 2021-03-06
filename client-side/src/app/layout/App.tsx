import { Fragment } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashBoard";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router";
import HomePage from "../../features/home/Homepage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

function App() {
  const location = useLocation();
  return (
    <Fragment>
      <ToastContainer position="bottom-right" hideProgressBar/>
      <Route path="/" component={HomePage} exact />
      <Route
        path={`/(.+)`}
        render={() => (
          <>
            <Navbar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
              <Route path="/activities" component={ActivityDashboard} exact />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
              <Route path="/errors" component={TestErrors}/>
              <Route path="/server-error" component={ServerError}/>
              <Route component={NotFound} path="*"/>
              </Switch>
            </Container>
          </>
        )}
      />
    </Fragment>
  );
}

export default observer(App);
