import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';
import { Story } from 'types';
import { mapRange } from 'utils/mapRange';
import { useWidth } from 'utils/useWidth';

import { Loading } from '@/components/atoms/Loading/Loading';
import constants from '@/components/constants';

const TimelinePrimitive = styled('div')``;

const MediaBox = styled('div')`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Line = styled('div')`
  width: 100%;
  height: 0.5rem;
  background-color: ${constants.theme.black};
  position: relative;
`;
const Block = styled('div')<{ left: number; active: boolean }>`
  height: ${constants.timeline.blockSize};
  width: ${constants.timeline.blockSize};
  position: absolute;
  left: ${(props) => `calc(${props.left}px - ${constants.timeline.blockSize} / 2)`};
  top: calc(-${constants.timeline.blockSize} / 4);
  background-color: ${(props) => (props.active ? constants.theme.colorA : constants.theme.white)};
  border: 1px solid ${constants.theme.black};
  cursor: pointer;
`;

interface TimelineProps {
  story: Story[];
}

const getBlockPositions = (story: Story[], width: number) => {
  const first = story[0];
  const last = story[story.length - 1];
  return story.map((episode) =>
    mapRange(episode.date, first.date, last.date, width * 0.1, width * 0.9)
  );
};

export const Timeline: React.FC<TimelineProps> = ({ story }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { width, loading } = useWidth(ref);
  const [index, setIndex] = React.useState(0);

  const blocks = getBlockPositions(story, width);

  return (
    <TimelinePrimitive ref={ref}>
      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <MediaBox>
            {story[index].media && (
              <figure>
                <img src={story[index].media.image} alt={story[index].media.caption} />
                <figcaption>{story[index].media.caption}</figcaption>
              </figure>
            )}
            <h2>
              {dayjs(story[index].date).format('YYYY-MM-DD')} - {story[index].title}
            </h2>
            <p>{story[index].description}</p>
          </MediaBox>
          <Line>
            {blocks.map((block, idx) => (
              <Block
                key={block}
                left={block}
                active={idx === index}
                onClick={() => setIndex(idx)}
              />
            ))}
          </Line>
        </React.Fragment>
      )}
    </TimelinePrimitive>
  );
};
