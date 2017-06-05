import Realm from 'realm';

class TriviaGame extends Realm.Object{}

TriviaGame.schema = {
  name: 'TriviaGame',
  properties: {
    score: 'int',
    difficulty: 'string',
    numberOfQuestions: 'int',
    createdAt: 'date'
  }
}

export default new Realm({ schema: [TriviaGame] });
