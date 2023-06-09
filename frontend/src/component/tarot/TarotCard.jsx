import React from "react";
import styled from "styled-components";
import TaroBack from "@assets/img/Taro_back.png";
import "@css/tarocard.css";

const Panel = styled.div`
  position: absolute;
  width: 23vw;
  height: 42vw;
  bottom: 3vh;
  border-radius: 5px;
  transition: box-shadow 0.2s ease-in-out, transform 0.5s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px 5px #c8c8c8;
  }
  &:visited {
    animation: zoomIn forwards 2s;
  }
  max-width: 120px;
  max-height: 222px;
  @keyframes zoomIn {
    0% {
    }
    50% {
      transform: scale(2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const TarotCardFrontImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

const TarotCardBackImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  top: -100%;
`;

function TarotCard({ card, selected, onClick, className, style }) {
  return (
    <Panel
      className={className}
      id={"card" + card.id}
      key={card.id}
      selected={selected}
      onClick={onClick}
    >
      <TarotCardFrontImage
        src={card.image}
        alt={card.name}
        className="tarot-front"
        style={
          style || {
            position: "relative",
            zIndex: 1,
            backfaceVisibility: "hidden",
          }
        }
      />
      <TarotCardBackImage
        src={TaroBack}
        alt={card.name}
        className="tarot-back"
        style={{
          position: "relative",
          zIndex: 2,
          backfaceVisibility: "hidden",
        }}
      />
    </Panel>
  );
}

export default TarotCard;
