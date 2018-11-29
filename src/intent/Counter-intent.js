import * as Rx from 'rxjs';

const subjects = {
  addCounterSubject: new Rx.Subject(),
  decCounterSubject: new Rx.Subject(),
};

export default {
  subjects,
  addCounter: () => subjects.addCounterSubject.next(),
  decCounter: () => subjects.decCounterSubject.next(),
};
