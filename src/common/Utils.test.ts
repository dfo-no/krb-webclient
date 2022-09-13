import { get } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import Utils from './Utils';
import {
  codelistsTestData,
  needHierarchyTestData,
  nestableCarsTestData,
  parentableCarsTestData,
  productsTestData,
  projectTestData
} from './TestData';
import { DateScorePair } from '../Nexus/entities/IPeriodDateQuestion';
import { ScoreValuePair } from '../Nexus/entities/ISliderQuestion';
import { TimeScorePair } from '../Nexus/entities/ITimeQuestion';

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
    const needs = Utils.findVariantsUsedBySpecification(project);

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

  it('Utils.productUsedInVariants returns true if variants with useProduct true and product in productslist', () => {
    const project = {
      ...projectTestData,
      needs: needHierarchyTestData,
      products: productsTestData
    };
    const isInUse1 = Utils.productUsedInVariants(productsTestData[0], project);
    expect(isInUse1).toBeTruthy();

    const isInUse2 = Utils.productUsedInVariants(productsTestData[2], project);
    expect(isInUse2).toBeFalsy();
  });

  it('Utils.codelistUsedInVariants returns true if questions with codelist selected is on any variant', () => {
    const project = {
      ...projectTestData,
      needs: needHierarchyTestData,
      codelist: codelistsTestData
    };
    const isInUse1 = Utils.codelistUsedInVariants(
      codelistsTestData[0],
      project
    );
    expect(isInUse1).toBeTruthy();

    const isInUse2 = Utils.codelistUsedInVariants(
      codelistsTestData[1],
      project
    );
    expect(isInUse2).toBeFalsy();
  });

  it('Utils.findScoreFromValue returns correct score for values', () => {
    const scoreValuePairs: ScoreValuePair[] = [
      { id: uuidv4(), value: 0, score: 0 },
      { id: uuidv4(), value: 30, score: 100 },
      { id: uuidv4(), value: 2, score: 12 },
      { id: uuidv4(), value: 3, score: 16 },
      { id: uuidv4(), value: 10, score: 30 },
      { id: uuidv4(), value: 20, score: 50 },
      { id: uuidv4(), value: 22, score: 60 },
      { id: uuidv4(), value: 25, score: 70 }
    ];

    const result1 = Utils.findScoreFromValue(2, scoreValuePairs);
    const result2 = Utils.findScoreFromValue(27.5, scoreValuePairs);
    const result3 = Utils.findScoreFromValue(2.1, scoreValuePairs);
    const result4 = Utils.findScoreFromValue(18, scoreValuePairs);
    expect(result1).toEqual(12);
    expect(result2).toEqual(85);
    expect(result3).toEqual(12.4);
    expect(result4).toEqual(46);
  });

  it('Utils.findScoreFromDate returns correct score for dates', () => {
    const scoreDatePairs: DateScorePair[] = [
      { id: uuidv4(), date: '2022-02-10T12:00:00.000Z', score: 0 },
      { id: uuidv4(), date: '2022-03-12T12:00:00.000Z', score: 100 },
      { id: uuidv4(), date: '2022-02-12T12:00:00.000Z', score: 12 },
      { id: uuidv4(), date: '2022-02-13T12:00:00.000Z', score: 16 },
      { id: uuidv4(), date: '2022-02-20T12:00:00.000Z', score: 30 },
      { id: uuidv4(), date: '2022-03-02T12:00:00.000Z', score: 50 },
      { id: uuidv4(), date: '2022-03-04T12:00:00.000Z', score: 60 },
      { id: uuidv4(), date: '2022-03-07T12:00:00.000Z', score: 70 }
    ];

    const result1 = Utils.findScoreFromDate(
      '2022-02-12T12:00:00.000Z',
      scoreDatePairs
    );
    const result2 = Utils.findScoreFromDate(
      '2022-03-10T12:00:00.000Z',
      scoreDatePairs
    );
    const result3 = Utils.findScoreFromDate(
      '2022-02-11T12:00:00.000Z',
      scoreDatePairs
    );
    const result4 = Utils.findScoreFromDate(
      '2022-02-28T12:00:00.000Z',
      scoreDatePairs
    );
    expect(result1).toEqual(12);
    expect(result2).toEqual(88);
    expect(result3).toEqual(6);
    expect(result4).toEqual(46);
  });

  it('Utils.findScoreFromTime returns correct score for times', () => {
    const scoreTimePairs: TimeScorePair[] = [
      { id: uuidv4(), time: '2022-02-10T07:00:00.000Z', score: 0 },
      { id: uuidv4(), time: '2022-02-10T12:00:00.000Z', score: 100 },
      { id: uuidv4(), time: '2022-02-10T07:20:00.000Z', score: 12 },
      { id: uuidv4(), time: '2022-02-10T07:30:00.000Z', score: 16 },
      { id: uuidv4(), time: '2022-02-10T08:40:00.000Z', score: 30 },
      { id: uuidv4(), time: '2022-02-10T10:20:00.000Z', score: 50 },
      { id: uuidv4(), time: '2022-02-10T10:40:00.000Z', score: 60 },
      { id: uuidv4(), time: '2022-02-10T11:10:00.000Z', score: 70 }
    ];

    const result1 = Utils.findScoreFromTime(
      '2022-02-12T07:20:00.000Z',
      scoreTimePairs
    );
    const result2 = Utils.findScoreFromTime(
      '2022-03-10T11:35:00.000Z',
      scoreTimePairs
    );
    const result3 = Utils.findScoreFromTime(
      '2022-02-11T07:21:00.000Z',
      scoreTimePairs
    );
    const result4 = Utils.findScoreFromTime(
      '2022-02-28T10:00:00.000Z',
      scoreTimePairs
    );
    expect(result1).toEqual(12);
    expect(result2).toEqual(85);
    expect(result3).toEqual(12.4);
    expect(result4).toEqual(46);
  });
});
