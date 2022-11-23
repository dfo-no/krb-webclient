import SpecificationService from './SpecificationService';

describe('SpecificationService', () => {
  const specificationService = new SpecificationService();
  const specId = 'detteerenspesifikasjonid';
  const specification = {
    ...SpecificationService.defaultSpecification(),
    id: specId,
  };
  const prodId = 'detteerenproduktid';
  const product = {
    ...SpecificationService.defaultSpecificationProduct(),
    id: prodId,
  };
  const answId = 'detteerensvarid';
  const answer = {
    ...SpecificationService.defaultRequirementAnswer(),
    id: answId,
  };
  const title = 'Tittel';

  beforeEach(async () => {
    await specificationService.setSpecification(specification);
  });

  it('setSpecification sets the specification and returns it correctly', async () => {
    const setResult = await specificationService.setSpecification({
      ...specification,
      title,
    });
    expect(setResult.title).toEqual(title);
  });

  it('getSpecification gets the specification sat by setSpecification', async () => {
    const getResult = await specificationService.getSpecification(specId);
    expect(getResult).toEqual(specification);
  });

  it('addSpecificationProduct adds a specification product to the specification', async () => {
    await specificationService.setSpecification(specification);
    const addResult = await specificationService.addSpecificationProduct(
      product
    );
    const getResult = await specificationService.getSpecification(specId);
    expect(getResult.products.length).toBe(1);
    expect(addResult.products.length).toBe(1);
  });

  it('editSpecificationProduct updates a specification product on the specification', async () => {
    await specificationService.setSpecification(specification);
    await specificationService.addSpecificationProduct(product);
    const newProduct = { ...product, title };
    const editResult = await specificationService.editSpecificationProduct(
      newProduct
    );
    const getResult = await specificationService.getSpecification(specId);
    expect(getResult.products[0].title).toEqual(title);
    expect(editResult.products[0].title).toEqual(title);
  });

  it('deleteSpecificationProduct deletes a specification product from the specification', async () => {
    await specificationService.setSpecification(specification);
    await specificationService.addSpecificationProduct(product);
    const deleteResult = await specificationService.deleteSpecificationProduct(
      product
    );
    const getResult = await specificationService.getSpecification(specId);
    expect(getResult.products.length).toBe(0);
    expect(deleteResult.products.length).toBe(0);
  });

  it('addProductAnswer adds a requirement answer to a specification product', async () => {
    await specificationService.setSpecification(specification);
    await specificationService.addSpecificationProduct(product);
    const addResult = await specificationService.addProductAnswer(
      answer,
      prodId
    );
    const getResult = await specificationService.getSpecification(specId);
    expect(getResult.products[0].requirementAnswers.length).toBe(1);
    expect(addResult.products[0].requirementAnswers.length).toBe(1);
    expect(getResult.products[0].requirements.length).toBe(1);
    expect(addResult.products[0].requirements.length).toBe(1);
  });

  it('deleteProductAnswer updates a requirement answer on a specification product', async () => {
    await specificationService.setSpecification(specification);
    await specificationService.addSpecificationProduct(product);
    await specificationService.addProductAnswer(answer, prodId);
    const deleteResult = await specificationService.deleteProductAnswer(
      answer,
      prodId
    );
    const getResult = await specificationService.getSpecification(specId);
    expect(getResult.products[0].requirementAnswers.length).toBe(0);
    expect(deleteResult.products[0].requirementAnswers.length).toBe(0);
    expect(getResult.products[0].requirements.length).toBe(0);
    expect(deleteResult.products[0].requirements.length).toBe(0);
  });

  it('addAnswer adds a requirement answer to the specification', async () => {
    await specificationService.setSpecification(specification);
    const addResult = await specificationService.addAnswer(answer);
    const getResult = await specificationService.getSpecification(specId);
    expect(getResult.requirementAnswers.length).toBe(1);
    expect(addResult.requirementAnswers.length).toBe(1);
    expect(getResult.requirements.length).toBe(1);
    expect(addResult.requirements.length).toBe(1);
  });

  it('deleteAnswer updates a requirement answer on the specification', async () => {
    await specificationService.setSpecification(specification);
    await specificationService.addAnswer(answer);
    const deleteResult = await specificationService.deleteAnswer(answer);
    const getResult = await specificationService.getSpecification(specId);
    expect(getResult.requirementAnswers.length).toBe(0);
    expect(deleteResult.requirementAnswers.length).toBe(0);
    expect(getResult.requirements.length).toBe(0);
    expect(deleteResult.requirements.length).toBe(0);
  });
});
