import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div)`
  position: sticky;
  top: 0;
  height: 100vh;
  margin-top: -100vh;
	z-index: 999;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
