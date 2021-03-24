import React from "react";
import Routes from "./Routes";
import ReactDOM from "react-dom"

// This "root" comes from /public/index.html
// render passed two parameters. First from where rendering should be done and 2nd what you want to render
ReactDOM.render(<Routes/>, document.getElementById("root"));