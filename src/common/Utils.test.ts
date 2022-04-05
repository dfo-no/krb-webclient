import { get } from 'lodash';
import Utils from './Utils';
import {
  needHierarchyTestData,
  nestableCarsTestData,
  parentableCarsTestData,
  productsTestData,
  projectTestData
} from './TestData';

describe('Utils functions should work', () => {
  test('Utils.parentable2Nestable', () => {
    const items = Utils.parentable2Nestable(parentableCarsTestData);

    // Check that the props are correct
    expect(items[1].title).toEqual('K');
    expect(items[0]?.children?.length).toEqual(2);

    const result1 = get(items, `[0].children.1.title`);

    expect(result1).toEqual('C_1');

    const result2 = get(items, `[0].children[1].children[0].title`);
    expect(result2).toEqual('D_2');

    const result3 = get(items, `[0].children[1].children[0].children[0].title`);
    expect(result3).toEqual('E_3');

    const result4 = get(items, `[1].title`);
    expect(result4).toEqual('K');

    // Make sure end-items have children property
    const result5 = get(items, `[1].children`);
    expect(result5.length).toBe(1);

    const result6 = get(
      items,
      `[0].children[1].children[0].children[0].children[0].title`
    );
    expect(result6).toEqual('F_4');

    const result7 = get(
      items,
      `[0].children[1].children[0].children[0].children[0].children`
    );
    expect(result7.length).toBe(0);
  });

  test('Utils.nestable2Levelable', () => {
    const leveled = Utils.nestable2Levelable(nestableCarsTestData);

    expect(leveled[0].title).toBe('A');
    expect(leveled[6].title).toBe('K');
    expect(leveled.length).toBe(7);
  });

  test('Utils.truncate', () => {
    expect(Utils.truncate(undefined)).toEqual('');

    // Possible bug: integer variable is included in the total: Expected result could be 'abcde$'
    expect(Utils.truncate('abcdefghijk', 5, '$')).toEqual('abcd$');

    // Possible bug: emojii is two bytes, and is included in the integer. Expected result should be 'abcde⚛️'
    expect(Utils.truncate('abcdefghijk', 5, '⚛️')).toEqual('abc⚛️');
  });

  test('Utils.capitalizeFirstLetter', () => {
    expect(Utils.capitalizeFirstLetter('bobbo')).toEqual('Bobbo');
    expect(Utils.capitalizeFirstLetter('A')).toEqual('A');
    expect(Utils.capitalizeFirstLetter('a')).toEqual('A');
    expect(Utils.capitalizeFirstLetter('')).toEqual('');
  });

  it('Utils.getNextIndexAfterDelete', () => {
    const ary1 = ['a'];
    const foundIndex1 = ary1.findIndex((n) => n === 'a');
    ary1.splice(foundIndex1, 1);
    const result1 = Utils.getNextIndexAfterDelete(ary1, foundIndex1);
    expect(result1).toEqual(null);

    const ary2 = ['a', 'b'];
    const foundIndex2 = ary2.findIndex((n) => n === 'a');
    ary1.splice(foundIndex2, 1);
    const result2 = Utils.getNextIndexAfterDelete(ary2, foundIndex2);
    expect(result2).toEqual(0);

    const ary3 = ['a', 'b', 'c', 'd'];
    const foundIndex3 = ary3.findIndex((n) => n === 'b');
    ary1.splice(foundIndex3, 1);
    const result3 = Utils.getNextIndexAfterDelete(ary3, foundIndex3);
    expect(result3).toEqual(1);

    const ary4: string[] = [];
    const foundIndex4 = ary4.findIndex((n) => n === 'b');
    ary4.splice(foundIndex4, 1);
    const result4 = Utils.getNextIndexAfterDelete(ary4, foundIndex4);
    expect(result4).toEqual(-1);

    const ary5: string[] = ['a', 'b', 'c', 'd'];
    const foundIndex5 = ary5.findIndex((n) => n === 'c');
    ary5.splice(foundIndex5, 1);
    const result5 = Utils.getNextIndexAfterDelete(ary5, foundIndex5);
    expect(result5).toEqual(2);

    const ary6: string[] = ['a', 'b', 'c', 'd'];
    const foundIndex6 = ary6.findIndex((n) => n === 'd');
    ary5.splice(foundIndex6, 1);
    const result6 = Utils.getNextIndexAfterDelete(ary6, foundIndex5);
    expect(result6).toEqual(2);
  });

  it('Utils.findParentTree returns list when parents', () => {
    const element = parentableCarsTestData[3]; // D_2, with parents -> C_1 (index 2) -> A (index 0)
    const parents = Utils.findParentTree(element, [], parentableCarsTestData);

    expect(parents.length).toEqual(2);
    expect(parents[0]).toEqual(parentableCarsTestData[0]);
    expect(parents[1]).toEqual(parentableCarsTestData[2]);
  });

  it('Utils.findParentTree returns empty list when no parents', () => {
    const element = parentableCarsTestData[7]; // K, with no parents
    const parents = Utils.findParentTree(element, [], parentableCarsTestData);

    expect(parents.length).toEqual(0);
  });

  it('Utils.findVariantsUsedBySpesification returns only variants with useSpesification true', () => {
    const project = { ...projectTestData, needs: needHierarchyTestData };
    const needs = Utils.findVariantsUsedBySpesification(project);

    expect(needs.length).toEqual(1);
    expect(needs[0].requirements.length).toEqual(1);
    expect(needs[0].requirements[0].variants.length).toEqual(1);
    expect(needs[0].requirements[0].variants[0].description).toEqual(
      'A3 Variant'
    );
  });

  it('Utils.findVariantsUsedByProduct returns only variants with useProduct true and product in productslist', () => {
    const project = {
      ...projectTestData,
      needs: needHierarchyTestData,
      products: productsTestData
    };
    const needsForProductA = Utils.findVariantsUsedByProduct(
      productsTestData[0],
      project
    );

    expect(needsForProductA.length).toEqual(1);
    expect(needsForProductA[0].requirements.length).toEqual(1);
    expect(needsForProductA[0].requirements[0].variants.length).toEqual(1);
    expect(needsForProductA[0].requirements[0].variants[0].description).toEqual(
      'A2 Variant'
    );

    const needsForProductB = Utils.findVariantsUsedByProduct(
      productsTestData[1],
      project
    );

    expect(needsForProductB.length).toEqual(2);
    expect(needsForProductB[0].requirements.length).toEqual(1);
    expect(needsForProductB[0].requirements[0].variants.length).toEqual(1);
    expect(needsForProductB[0].requirements[0].variants[0].description).toEqual(
      'A2 Variant'
    );
    expect(needsForProductB[1].requirements.length).toEqual(1);
    expect(needsForProductB[1].requirements[0].variants.length).toEqual(1);
    expect(needsForProductB[1].requirements[0].variants[0].description).toEqual(
      'B Variant'
    );
  });
});
