import * as Rx from 'rxjs';
import update from 'immutability-helper';
import IntentCounter from '../intent/Counter-intent';
import IntentJSON from '../intent/getList';

const subject = new Rx.Subject(1);
let state = {
  counter: 0,
  goodsList: [],
};
IntentCounter.subjects.addCounterSubject.subscribe(() => {
  state = update(state, {
    $merge: {
      counter: state.counter + 1,
    },
  });
  subject.next(state);
});
IntentCounter.subjects.decCounterSubject.subscribe(() => {
  state = update(state, {
    $merge: {
      counter: state.counter - 1,
    },
  });
  subject.next(state);
});
IntentJSON.jsonSubjects.goGetJSON.subscribe(data => {
  state = update(state, {
    $merge: {
      goodsList: data,
    },
  });
  console.info(state);
  subject.next(state);
});

subject.next(state);
export default subject;
