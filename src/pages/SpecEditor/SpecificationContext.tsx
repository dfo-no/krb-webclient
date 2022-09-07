import { createContext, useContext, useEffect, useState } from 'react';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import { ISpecificationProduct } from '../../Nexus/entities/ISpecificationProduct';
import SpecificationService from '../../Nexus/services/SpecificationService';
import { useParams } from 'react-router-dom';
import Nexus from '../../Nexus/Nexus';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { useHeaderState } from '../../components/Header/HeaderContext';

interface ISpecificationContext {
  specification: ISpecification;
  addSpecificationProduct: (spec: ISpecificationProduct) => void;
  editSpecificationProduct: (spec: ISpecificationProduct) => void;
  addGeneralAnswer: (answer: IRequirementAnswer) => void;
  deleteGeneralAnswer: (answer: IRequirementAnswer) => void;
  addProductAnswer: (answer: IRequirementAnswer, productId: string) => void;
  deleteProductAnswer: (answer: IRequirementAnswer, productId: string) => void;
}

const initialContext: ISpecificationContext = {
  specification: SpecificationService.defaultSpecification(),
  addSpecificationProduct: (): void => {
    throw new Error('Function not implemented.');
  },
  editSpecificationProduct: (): void => {
    throw new Error('Function not implemented.');
  },
  addGeneralAnswer: (): void => {
    throw new Error('Function not implemented.');
  },
  deleteGeneralAnswer: (): void => {
    throw new Error('Function not implemented.');
  },
  addProductAnswer: (): void => {
    throw new Error('Function not implemented.');
  },
  deleteProductAnswer: (): void => {
    throw new Error('Function not implemented.');
  }
};

export const SpecificationContext =
  createContext<ISpecificationContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

interface IRouteParams {
  id: string;
}

export const SpecificationProvider = ({ children }: IProps) => {
  const { setTitle } = useHeaderState();
  const [specification, setSpecification] = useState(
    SpecificationService.defaultSpecification()
  );
  const { id } = useParams<IRouteParams>();
  const nexus = Nexus.getInstance();

  useEffect(() => {
    nexus.specificationService.getSpecification(id).then((spec) => {
      setSpecification(spec);
      setTitle(spec.title);
    });
  }, [id, nexus, setTitle]);

  const addSpecificationProduct = (product: ISpecificationProduct) => {
    nexus.specificationService.addSpecificationProduct(product).then((spec) => {
      setSpecification(spec);
    });
  };

  const editSpecificationProduct = (product: ISpecificationProduct) => {
    nexus.specificationService
      .editSpecificationProduct(product)
      .then((spec) => {
        setSpecification(spec);
      });
  };

  const addGeneralAnswer = (answer: IRequirementAnswer) => {
    nexus.specificationService.addAnswer(answer).then((spec) => {
      setSpecification(spec);
    });
  };

  const addProductAnswer = (answer: IRequirementAnswer, productId: string) => {
    nexus.specificationService
      .addProductAnswer(answer, productId)
      .then((spec) => {
        setSpecification(spec);
      });
  };

  const deleteGeneralAnswer = (answer: IRequirementAnswer) => {
    nexus.specificationService.deleteAnswer(answer).then((spec) => {
      setSpecification(spec);
    });
  };

  const deleteProductAnswer = (
    answer: IRequirementAnswer,
    productId: string
  ) => {
    nexus.specificationService
      .deleteProductAnswer(answer, productId)
      .then((spec) => {
        setSpecification(spec);
      });
  };

  return (
    <SpecificationContext.Provider
      value={{
        specification,
        addSpecificationProduct,
        editSpecificationProduct,
        addGeneralAnswer,
        deleteGeneralAnswer,
        addProductAnswer,
        deleteProductAnswer
      }}
    >
      {children}
    </SpecificationContext.Provider>
  );
};

export const useSpecificationState = (): ISpecificationContext => {
  const context = useContext(SpecificationContext);

  if (context === undefined) {
    throw new Error(
      'useSpecificationState must be used within a SpecificationProvider'
    );
  }
  return context;
};
