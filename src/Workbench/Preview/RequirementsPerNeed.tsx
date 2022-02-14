import React from 'react';
import Utils from '../../common/Utils';
import { Levelable } from '../../models/Levelable';
import { Nestable } from '../../models/Nestable';
import { INeed } from '../../Nexus/entities/INeed';
import { IProduct } from '../../Nexus/entities/IProduct';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { useAppSelector } from '../../store/hooks';
import RequirementList from './RequirementList';

interface IProps {
  selectedProduct: Levelable<IProduct> | null;
  isRequirement: boolean;
  updateSelectedFunction: (item: IRequirement) => void;
}

export default function RequirementsPerNeed({
  selectedProduct,
  updateSelectedFunction,
  isRequirement
}: IProps): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);

  const findAssociatedReqsAndNeeds = (): [
    { [key: string]: IRequirement[] },
    Nestable<INeed>[]
  ] => {
    let requirements: { [key: string]: IRequirement[] } = {};
    let needs: Nestable<INeed>[] = [];
    if (selectedProduct !== null) {
      const [associatedRequirements, associatedNeeds] =
        Utils.findAssociatedRequirements(selectedProduct, project);
      requirements = associatedRequirements;
      needs = associatedNeeds;
    }
    if (isRequirement) {
      needs = project.needs;
    }

    return [requirements, needs];
  };

  const associatedValues = findAssociatedReqsAndNeeds();
  const relatedRequirements = associatedValues[0];
  const relatedNeeds = associatedValues[1];

  const needHierarchy = (needsList: Nestable<INeed>[]) => {
    let requirements: IRequirement[] = [];
    const hierarchy = needsList.map((element, idx) => {
      if (isRequirement) {
        requirements = element.requirements;
      }
      if (selectedProduct !== null && relatedRequirements !== {}) {
        if (element.id in relatedRequirements)
          requirements = relatedRequirements[element.id];
      }
      return (
        <div key={`needlist ${idx}`}>
          {requirements.length > 0 && (
            <RequirementList
              requirements={requirements}
              updateSelectedFunction={updateSelectedFunction}
            />
          )}
        </div>
      );
    });
    return <>{hierarchy}</>;
  };

  return needHierarchy(relatedNeeds);
}
