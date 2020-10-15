import React, { useCallback, useRef, useState } from 'react';
import ModelOverlay from '../ModelOverlay';
import ModelsContext, { ICarModel } from '../ModelsContext';

import { Container, OverlayRoot } from './styles';

const ModelsWrapper: React.FC = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [registeredModels, setRegisteredModels] = useState<ICarModel[]>([]);

  const registerModel = useCallback((model: ICarModel) => {
    setRegisteredModels((state) => [...state, model]);
  }, []);

  const unregisterModel = useCallback((modelName: string) => {
    setRegisteredModels((state) =>
      state.filter(model => model.modelName !== modelName),
    );
  }, []);

  const getModelByName = useCallback(
    (modelName: string) => registeredModels.find((item) => item.modelName === modelName) || null,
    [registeredModels],
  );

  return (
    <ModelsContext.Provider
      value={{
        wrapperRef,
        registeredModels,
        registerModel,
        unregisterModel,
        getModelByName,
      }}
    >
      <Container ref={wrapperRef}>
        <OverlayRoot>
          {registeredModels.map(item => (
            <ModelOverlay key={item.modelName} model={item} >{item.overlayNode}</ModelOverlay>
          ))}
        </OverlayRoot>

        {children}
      </Container>
    </ModelsContext.Provider>
  );
};

export default ModelsWrapper;
