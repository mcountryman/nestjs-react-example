import React from "react";
import { FnComponent } from "./components/fn_component";

export class App extends React.Component {
  public render() {
    return (
      <FnComponent myPropName="hello react" />
    );
  }
}
