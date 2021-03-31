import React from "react";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

const LoadingComponent = (props) => {
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <>
      {isLoading ? (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgb(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : null}
      {props.children}
    </>
  );
};

export default LoadingComponent;

// ///////////////////////////////////////////////////////////////////////////////////////////

// export const loading = (isloading) => {
//     return dispatch => {
//         // const {data} = await getAllSubjectTree(token);
//         dispatch({ type: "SET_LOADING", payload: isloading })
//     }
// };

// const loadingReducer = (state = false, action) => {
//     switch (action.type) {
//         case 'SET_LOADING':
//             console.log('...is loading')
//             return action.payload

//         default:
//             return state
//     }
// }

// export { loadingReducer }


