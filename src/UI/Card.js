import React from "react";
import styled from "styled-components";
import { getImageFromUsername } from "../utils";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin: 10px 0;
  width: 250px;
  height: 100px;
  justify-content: space-between;
  position: relative;
`;

const IdSection = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: grey;
  margin-bottom: 5px;
`;

const TitleSection = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Tag = styled.span`
  background-color: #f5f5f5;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  text-align: center;
`;

const ImageContainer = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
`;

const Card = ({ id, title, tag, name, imgSrc }) => {
  return (
    <CardContainer>
      <IdSection>{id}</IdSection>
      <div style={{ display: "flex", alignItems: "center" }}>
        {imgSrc != null && (
          <img
            src={imgSrc}
            alt="user"
            width="20"
            height="20"
            style={{ borderRadius: "50%", marginRight: "10px" }}
          />
        )}
        <TitleSection>{title}</TitleSection>
      </div>
      <TagContainer>
        <Tag>
          <img
            src="./assets/dot.png"
            style={{
              height: "20px",
              width: "20px",
              translate: "0px 4.6px"
            }}
          />
          {tag}
        </Tag>
      </TagContainer>
      <ImageContainer>
        <img
          src={getImageFromUsername(name)}
          alt="user"
          width="25"
          height="25"
          style={{ borderRadius: "50%" }}
        />
      </ImageContainer>
    </CardContainer>
  );
};

export default Card;
