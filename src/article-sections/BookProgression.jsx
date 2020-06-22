import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import styled from "styled-components";
import CustomRadialChart from "../data-viz/radial-chart/CustomRadialChart.jsx";
import spells from "../data/spellCounts.json";
import _ from "lodash";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ScrollamaWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepWrapper = styled.div`
  margin: 50vh 0;
  font-size: 50px;
  height: 200px;
  display: flex;
  align-items: center;
`;

const BookProgression = () => {
  const [book, setBook] = useState(null);
  const [previousBook, setPreviousBook] = useState(null);

  const onStepEnter = ({ data, direction }) => {
    if (direction === "up") setPreviousBook(data + 1);
    else if (direction === "down") setPreviousBook(data - 1);
    setBook(data);
  };

  return (
    <Wrapper>
      <ScrollamaWrapper>
        <Scrollama onStepEnter={onStepEnter} offset={0.5} debug>
          {_.range(1, 8).map((book) => (
            <Step data={book} key={book}>
              <StepWrapper>{book}</StepWrapper>
            </Step>
          ))}
        </Scrollama>
      </ScrollamaWrapper>
      <div>
        {!_.isEmpty(spells[book]) ? (
          <CustomRadialChart
            fullData={spells}
            currentBook={book}
            previousBook={previousBook}
          />
        ) : null}
      </div>
    </Wrapper>
  );
};

export default BookProgression;
