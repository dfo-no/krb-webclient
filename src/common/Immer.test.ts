import produce from 'immer';

describe('Immer', () => {
  test('Can mutate state', () => {
    interface Test {
      title: string;
      done: boolean;
    }

    const baseState: Test[] = [
      {
        title: 'Learn TypeScript',
        done: true
      },
      {
        title: 'Try Immer',
        done: false
      }
    ];

    const nextState = produce(baseState, (draftState) => {
      draftState.push({ title: 'Tweet about it', done: true });
      // eslint-disable-next-line no-param-reassign
      draftState[1].done = true;
    });

    expect(baseState.length).toBe(2);
    expect(nextState.length).toBe(3);

    // same for the changed 'done' prop
    expect(baseState[1].done).toBe(false);
    expect(nextState[1].done).toBe(true);

    // unchanged data is structurally shared
    expect(nextState[0]).toBe(baseState[0]);
    // ...but changed data isn't.
    expect(nextState[1]).not.toBe(baseState[1]);
  });
});
