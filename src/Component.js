import React from "react";
import styled from "styled-components";
import { useGlobalState, useGlobalDispatch } from "./GlobalState";
import Board from "./UI/Board";
const Header = styled.div`
  background-color: white;
  padding: 12px;
`;
function Component() {
  const globalState = useGlobalState();
  const dispatch = useGlobalDispatch();
  const selectedView = globalState.viewType;
  const handleChangeView = (viewType) => {
    localStorage.setItem("viewType", viewType);
    dispatch({ type: "SET_VIEW", payload: viewType });
  };
  return (
    <div>
      <Header>
        <select
          style={{
            border: "0px",
            padding: "4px",
            outline: "0",
            boxShadow: "0px 0px 4px black",
            borderRadius: "5px"
          }}
          value={selectedView}
          onChange={(e) => handleChangeView(e.target.value)}
        >
          <option value="status">Status</option>
          <option value="priority">Priority</option>
          <option value="user">User</option>
        </select>
      </Header>
      <div>
        <Board />
      </div>
    </div>
  );
}

export default Component;
