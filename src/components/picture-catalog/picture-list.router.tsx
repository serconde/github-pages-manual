import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import { Grid } from "@material-ui/core";
import { PictureListContainer } from "./picture-list.container";
import { PictureListMenu } from "./picture-list.menu";

const pictureCategories = ["Kitties", "Puppies"];

export const PictureListRouter: React.FC = () => {

  return (
    <Grid>
      <Router>
        <PictureListMenu pictureCategories={pictureCategories}></PictureListMenu>
        <Route
          exact={true}
          path="/:pictureCategory"
          render={({ match }) => <PictureListContainer {...match.params} />}
        />
        <Route exact path="/">
          <Redirect to={"/" + pictureCategories[0]} />
        </Route>
      </Router>
    </Grid>
  );
};
