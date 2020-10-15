import React, { ReactNode } from 'react';

export interface ICarModel {
  modelName: string;
  overlayNode: ReactNode;
  sectionRef: React.RefObject<HTMLElement>;
}

interface IModelContext {
  wrapperRef: React.RefObject<HTMLElement>;
  registeredModels: ICarModel[];
  registerModel: (model: ICarModel) => void;
  unregisterModel: (modelName: string) => void;
  getModelByName: (modelName: string) => ICarModel | null;
}

export default React.createContext<IModelContext>({} as IModelContext);
