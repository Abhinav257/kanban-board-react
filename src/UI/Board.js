import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { useGlobalState } from "../GlobalState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { getImageFromUsername } from "../utils";

const labelCollect = {
  priority: [
    {
      id: 0,
      name: "No priority",
      image: "https://cdn-icons-png.flaticon.com/128/1828/1828805.png"
    },
    {
      id: 4,
      name: "Urgent",
      image: "https://cdn-icons-png.flaticon.com/128/2014/2014825.png"
    },
    {
      id: 3,
      name: "High",
      image: "/assets/high.png"
    },
    {
      id: 2,
      name: "Medium",
      image: "/assets/medium.png"
    },
    {
      id: 1,
      name: "Low",
      image: "/assets/low.png"
    }
  ],

  status: [
    {
      id: "Backlog",
      name: "Backlog",
      image: "https://cdn-icons-png.flaticon.com/128/5266/5266222.png"
    },
    {
      id: "Todo",
      name: "To Do",
      image: "https://cdn-icons-png.flaticon.com/128/3515/3515278.png"
    },
    {
      id: "In progress",
      name: "In Progress",
      image: "https://cdn-icons-png.flaticon.com/128/1716/1716746.png"
    },
    {
      id: "Done",
      name: "Done",
      image: "https://cdn-icons-png.flaticon.com/128/10828/10828604.png"
    },
    {
      id: "Canceled",
      name: "Cancelled",
      image: "https://cdn-icons-png.flaticon.com/128/4347/4347434.png"
    }
  ]
};

const BoardContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap; // added this to wrap columns to the next line when screen size reduces
  background: "blue";
  @media (max-width: 1200px) {
    gap: 15px;
  }

  @media (max-width: 992px) {
    gap: 10px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Column = styled.div`
  max-width: 250px;
  padding: 10px;
  padding-top: 40px;
  margin-right: 10px;
  position: relative;
  flex: 1;

  @media (max-width: 1200px) {
    width: calc(25% - 10px);
  }

  @media (max-width: 992px) {
    width: calc(33.33% - 10px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const CategoryLabel = styled.div`
  display: flex;
  align-items: center;

  span:first-child {
    margin-right: 5px;
  }
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0; // prevent icons from shrinking

  & > *:first-child {
    margin-right: 5px;
  }
`;

const Board = () => {
  const globalState = useGlobalState();
  const { data, viewType } = globalState;
  const dataModel = {};

  const getStatus = (label) => {
    const tickets = data?.tickets?.filter(
      (ticket) => ticket[viewType] === label.id
    );
    return { name: label.name, tickets };
  };
  const getUserTickets = (user) => {
    const tickets = data.tickets.filter((ticket) => ticket.userId === user.id);
    return { name: user.name, tickets };
  };

  const newLabel =
    viewType === "user"
      ? data?.users?.map(getUserTickets)
      : labelCollect[viewType]?.map(getStatus);
  newLabel?.forEach((type) => {
    dataModel[type?.name] = type?.tickets;
  });

  console.log(dataModel["Urgent"]);
  return (
    <div>
      <BoardContainer>
        {Object.keys(dataModel).map((key, value) => (
          <Column key={key} className="kanban-column">
            <LabelContainer>
              <CategoryLabel>
                <img
                  src={
                    viewType === "user"
                      ? getImageFromUsername(key)
                      : labelCollect[viewType]?.filter(
                          ({ name }) => name === key
                        )[0].image
                  }
                  style={{
                    height: "20px",
                    width: "20px",
                    margin: "2px",
                    borderRadius: viewType === "user" ? "50%" : "0%"
                  }}
                />
                <span style={{ marginLeft: "12px" }}>{key}</span>
                <span></span>({dataModel[key]?.length || 0})
              </CategoryLabel>
              <IconContainer>
                <FontAwesomeIcon
                  icon={faPlus}
                  size="xs"
                  style={{ marginRight: "5px" }}
                />
                <FontAwesomeIcon icon={faEllipsisH} size="xs" />
              </IconContainer>
            </LabelContainer>
            {dataModel[key]?.map(({ id, title, tag, status, userId }) => (
              <Card
                key={id}
                id={id}
                title={title}
                tag={tag}
                imgSrc={
                  viewType !== "status"
                    ? labelCollect["status"]?.filter(
                        ({ id }) => id === status
                      )[0].image
                    : null
                }
                name={data?.users?.filter(({ id }) => id === userId)[0].name}
              />
            ))}
          </Column>
        ))}
      </BoardContainer>
    </div>
  );
};

export default Board;
