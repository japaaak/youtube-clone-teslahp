import { useTransform } from 'framer-motion';
import React, { useCallback, useLayoutEffect, useState } from 'react';

import { ICarModel } from '../ModelsContext';
import useWrapperScroll from '../useWrapperScroll';

import { Container } from './styles';

interface IProps {
  model: ICarModel
}

type SectionDimensions = Pick<HTMLDivElement, 'offsetTop' | 'offsetHeight'>

const ModelOverlay: React.FC<IProps> = ({ children, model }) => {
  const getSectionDimension = useCallback(() => {
    return {
      offsetTop: model.sectionRef.current?.offsetTop,
      offsetHeight: model.sectionRef.current?.offsetHeight,
    } as SectionDimensions;
  }, []);

  const [dimension, setDimension] = useState<SectionDimensions>(getSectionDimension());

  useLayoutEffect(() => {
    function onResize() {
      window.requestAnimationFrame(() => setDimension(getSectionDimension()))
    }
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize)
  }, []);

  const { scrollY } = useWrapperScroll();

  const sectionScrollProgress = useTransform(scrollY, y => (y - dimension.offsetTop) / dimension.offsetHeight)

  const opacity = useTransform(sectionScrollProgress, [-0.42, -0.05, 0.05, 0.42], [0, 1, 1 ,0])

  const pointerEvents = useTransform(opacity, value =>
    value > 0 ? 'auto' : 'none');

  return (<Container style={{opacity, pointerEvents}}>{children}</Container>);
}

export default ModelOverlay;
