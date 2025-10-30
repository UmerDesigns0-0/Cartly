import { GridLoader, PropagateLoader, RiseLoader } from "react-spinners";

const color = "#f97316"; // Tailwind orange-500
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: color,
};

function Spinners({ loading, type = "grid", size = 60 }) {
  const spinnerProps = {
    color,
    loading,
    cssOverride: override,
    size,
  };

  switch (type) {
    case "prop":
      return <PropagateLoader {...spinnerProps} />;
    case "rise":
      return <RiseLoader {...spinnerProps} />;
    default:
      return <GridLoader {...spinnerProps} />;
  }
}

export default Spinners;
