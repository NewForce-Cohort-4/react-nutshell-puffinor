import { Route } from "react-router-dom";
import React, { Component } from "react";
import { ArticleProvider } from "./articles/ArticlesProvider"
import { ArticleList } from "./articles/ArticleList"
import { ArticleForm } from "./articles/ArticlesForm"
import { ArticleDetail } from "./articles/ArticlesDetails"

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <ArticleProvider>
          <Route  path ="/articles">
            <ArticleList />
          </Route>
          <Route exact path="/articles/create">
            <ArticleForm />
          </Route>
          <Route exact path="/articles/detail/:articleId(\d+)">
            <ArticleDetail />
          </Route>
        </ArticleProvider>
        {/* // Remove null and return the component which will show news articles */}

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

        <Route
          path="/events" render={props => {
            return null
            // Remove null and return the component which will show the user's events
          }}
        />

      </React.Fragment>
    );
  }
}
