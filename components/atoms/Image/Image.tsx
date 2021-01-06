import NextImage from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { useInterval } from 'utils/useInterval';

import constants from '@/config/constants';

const ImagePrimitive = styled('div')`
  width: 100%;
  height: 100%;
  img {
    max-width: 100%;
    height: 100%;
    max-height: 100vh;
    object-fit: cover;
    object-position: top;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 1s ease-in-out;
  }
  img.inactive {
    opacity: 0;
  }
  img.active {
    opacity: 1;
  }
  ${constants.devices.laptop} {
    img {
      width: 66%;
      object-fit: contain;
      object-position: center center;
    }
  }
`;

export const Image: React.FC = () => {
  const [imageIdx, setImageIdx] = React.useState(0);

  useInterval(() => {
    setImageIdx((idx) => (idx + 1) % constants.home.pictures.length);
  }, 5000);

  return (
    <ImagePrimitive>
      {constants.home.pictures.map((image, idx) => (
        <NextImage
          key={image}
          src={`${constants.imageBaseURL}${image}`}
          className={idx === imageIdx ? 'active' : 'inactive'}
          alt="tejo<3varsh"
          unsized
        />
      ))}
    </ImagePrimitive>
  );
};
