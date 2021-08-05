import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';
import Utils from '../../common/Utils';
import QuestionEnum from '../../models/QuestionEnum';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { useAppSelector } from '../../store/hooks';
import FileInputForm from '../Requirement/AlternativeForms/FileInputForm';
import CodelistForm from '../Requirement/AlternativeForms/ICodeListForm';
import ValueForm from '../Requirement/AlternativeForms/ISliderForm';
import NoProperties from '../Requirement/AlternativeForms/NoProperties';
import PeriodDateForm from '../Requirement/AlternativeForms/PeriodTimeForm';
import TextAlternativeForm from '../Requirement/AlternativeForms/TextAlternativeForm';

export default function EditAlternative(): ReactElement {
  const { alternativeId } = useAppSelector(
    (state) => state.selectedAlternative
  );
  const { spec } = useAppSelector((state) => state.specification);
  const { productId } = useAppSelector((state) => state.selectedSpecProduct);

  if (!productId) {
    return <p>No selected product</p>;
  }

  const productIndex = Utils.ensure(
    spec.products.findIndex(
      (product: SpecificationProduct) => product.id === productId
    )
  );
  if (!alternativeId) {
    return <p>No alternative selected</p>;
  }

  const itemIndex = spec.products[productIndex].requirementAnswers.findIndex(
    (alt) => alt.id === alternativeId
  );
  const item = spec.products[productIndex].requirementAnswers[itemIndex];
  return (
    <Container fluid className="mt-4">
      <h4>Edit Alternative</h4>
      {item.alternative.type === QuestionEnum.Q_SLIDER && (
        <ValueForm parentAnswer={item} />
      )}
      {item.alternative.type === QuestionEnum.Q_FILEUPLOAD && (
        <FileInputForm parentAnswer={item} />
      )}
      {item.alternative.type === QuestionEnum.Q_TEXT && (
        <TextAlternativeForm parentAnswer={item} />
      )}
      {item.alternative.type === QuestionEnum.Q_CODELIST && (
        <CodelistForm parentAnswer={item} />
      )}
      {item.alternative.type === QuestionEnum.Q_PERIOD_DATE && (
        <PeriodDateForm parentAnswer={item} />
      )}
      {item.alternative.type === QuestionEnum.Q_CHECKBOX && <NoProperties />}
    </Container>
  );
}
