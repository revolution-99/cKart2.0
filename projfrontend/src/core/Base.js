import React from "react";
import Menu from "./Menu";
// If there are curly braces then return is a must otherwise I can write it as below
// const Base = () => (
//         <div>

//         </div>
// )

// I am creating the variables like "title","description" etc to make the code reusable i.e. whennever I want to add any description further in this file, I don't need to write it fully. I can simply write {description}. Without these variables just a peice of HTML inside a component
const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      {/* .container-fluid, which is width: 100% at all breakpoints */}
      <div className="jumbotron bg-dark text-white text-center">
        {/* The use of curly braces here simply indicates the implementaion of the varible "title" in the component <h2></h2> */}
        <h2 className="display-4">{title}</h2>
        {/* Make a paragraph stand out by adding .lead. */}
        <p className="lead">{description}</p>
      </div>

        {/* Here the value of the class will be fetched from the variable "className" and the content will come from "children*/}
        <div className={className}>{children}</div>
      </div>

    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          An Amazing <span className="text-white">MERN</span> Bootcamp
        </span>
      </div>
    </footer>
  </div>
);
{
  /* A success(green) color will come from class bg-success */
}

export default Base;
