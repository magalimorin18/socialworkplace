import React from "react";
import { Provider, teamsTheme, Loader } from "@fluentui/react-northstar";
import { HashRouter as Router, Redirect, Route } from "react-router-dom";
import { useTeamsFx } from "./sample/lib/useTeamsFx";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import "./App.css";
import TabConfig from "./TabConfig";

import Notification from "./UI/Notification";
// import { useState, useRef } from "react";

// export const NotifContext = React.createContext();

export default function App() {
  const { theme, loading } = useTeamsFx();

  // const [list, setList] = useState();
  // const listRef = useRef(list);
  // listRef.current = list;

  // function addNotification(type, text, timeOut = 4000) {
  //   const newNotif = { id: Math.random(), text, type, fadeIn: true };
  //   setTimeout(() => {
  //     setList(
  //       listRef.current.map((notif) => {
  //         if (notif.id === newNotif.id) {
  //           return { ...newNotif, fadeIn: false };
  //         }
  //         return notif;
  //       })
  //     );
  //   }, timeOut);
  //   setList([...list, newNotif]);
  // }

  // function removeNotification(notif) {
  //   setList(listRef.current.filter((prevNotif) => prevNotif.id !== notif.id));
  // }

  return (
    // <NotifContext.Provider
    //   value={{ add: addNotification, remove: removeNotification }}
    // >
    <Notification>
      <Provider
        theme={theme || teamsTheme}
        styles={{ backgroundColor: "#f9f9f9" }}
      >
        <Router>
          <Route exact path="/">
            <Redirect to="/tab" />
          </Route>
          {loading ? (
            <Loader style={{ margin: 100 }} />
          ) : (
            <>
              <Route exact path="/privacy" component={Privacy} />
              <Route exact path="/termsofuse" component={TermsOfUse} />
              <Route exact path="/tab" component={Tab} />
              <Route exact path="/config" component={TabConfig} />
            </>
          )}
        </Router>
        {/* <Notification list={list} /> */}
      </Provider>
    </Notification>
    // </NotifContext.Provider>
  );
}
