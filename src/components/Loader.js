import { LoadingRow, LoaderContainer } from "../styles/Global.styled.js";
import { default as LoaderSpinner } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Loader({ ref, row, full }) {
  if (row) {
    return (
      <LoadingRow>
        <LoaderSpinner
          type="Oval"
          color="rgb(164, 109, 200)"
          height={40}
          width={100}
          timeout={3000}
        />
      </LoadingRow>
    );
  }

  return (
    <LoaderContainer
      style={
        full && {
          minHeight: "100vh",
          background: `#121212`,
        }
      }
    >
      <LoaderSpinner
        type="Oval"
        color="rgb(164, 109, 200)"
        height={40}
        width={100}
        timeout={3000}
      />
    </LoaderContainer>
  );
}
