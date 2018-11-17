/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
const Classes = [
  {
    ClassNumber:'Physics 105',
    Professor: 'William Jones',
    Review: '3.8',
    Prereq: 'None',
  }, {
    ClassNumber:'Maths 103',
    Professor: 'Hansheng Diao',
    Review: '4.5',
    Prereq: 'Maths 104',
  }, {
    ClassNumber: 'Chemistry 201',
    Professor: 'Sonja Francis',
    Review: 3.2,
    Prereq: 'None',
  }
]
const Num = {
    PHY: 29,
    CHM: 28,
    MAT: 87,
  }


const LaunchRequest = {
  canHandle(handlerInput){
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'

  },
  handle(handlerInput){
    return handlerInput.responseBuilder
      .speak("Hello! Welcome to Course Selector. I can help you find the best course for you. What subject are you studying?")
      .reprompt("What subject are you studying?")
      .getResponse();
  },
};
const InProgressFindSubjectIntent = {
  canHandle(handlerInput){
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest'
        && request.intent.name === 'FindSubjectIntent')
        && request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput){
    return handlerInput.responseBuilder
      .addDelegateDirective()
      .getResponse();
  },
};
const FindSubjectIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return (request.type === 'IntentRequest'
        && request.intent.name === 'FindSubjectIntent');
  },
  handle(handlerInput) {
   let subjectId = handlerInput.requestEnvelope.request.intent.slots.subject.resolutions
    .resolutionsPerAuthority[0]
    .values[0]
    .value
    .id;
   let speechOutput;
   speechOutput = " There are " + Num[subjectId] + " " + handlerInput.requestEnvelope.request.intent.slots.subject.value + " courses. First three are Math 100, Math 103, Math 104. Tell me which of these interests you. If not, say Next Three to hear the next three."


    return handlerInput.responseBuilder
      .speak(speechOutput)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Space Facts';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';``

const data = [
  'A year on Mercury is just 88 days long.',
  'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
  'Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.',
  'On Mars, the Sun appears about half the size as it does on Earth.',
  'Earth is the only planet not named after a god.',
  'Jupiter has the shortest day of all the planets.',
  'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
  'The Sun contains 99.86% of the mass in the Solar System.',
  'The Sun is an almost perfect sphere.',
  'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
  'Saturn radiates two and a half times more energy into space than it receives from the sun.',
  'The temperature inside the Sun can reach 15 million degrees Celsius.',
  'The Moon is moving approximately 3.8 cm away from our planet every year.',
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    InProgressFindSubjectIntent,
    FindSubjectIntent,
    HelpHandler,
    ExitHandler,
    LaunchRequest,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
