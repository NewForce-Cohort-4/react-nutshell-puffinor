import { Route } from "react-router-dom";
import React, { Component } from "react";
import { TaskProvider } from "./tasks/TaskDataProvider"
import { TasksList } from "./tasks/TaskList"
import { ArticleProvider } from "./articles/ArticlesProvider"
import { ArticleList } from "./articles/ArticleList"
import { ArticleForm } from "./articles/ArticlesForm"

import { MessageProvider } from "./messages/MessageProvider"
import { MessageList } from "./messages/MessageList"

import { EventProvider } from "./events/EventProvider"
import { EventList } from "./events/EventList"


export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <ArticleProvider>
          <Route exact path ="/articles">
            <ArticleList />
          </Route>
        </ArticleProvider>
        {/* // Remove null and return the component which will show news articles */}

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />
        {/* //Run this when address is /messages */}
        <MessageProvider>
                <Route exact path="/messages">
                    <MessageList />
                </Route>
        </MessageProvider>

        <TaskProvider>
        <Route
          path="/tasks" render={props => {
            return <TasksList />
          }}
        />
        </TaskProvider>

        <EventProvider>
          <Route exact path="/events">
            <EventList />
          </Route>


        </EventProvider>
        

      </React.Fragment>
    );
  }
}
