'use strict';

const userRepo = require('./userRepo');

module.exports = {
  getPersonsTeam
}

///////////////////////////////////////////

function getPersonsTeam (intent, session, callback) {
    const cardTitle = intent.name;
    const personNameSlot = intent.slots.Person;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = true;
    let speechOutput = '';

    if (personNameSlot) {
        const personName = _formatPersonName(personNameSlot.value);
        const user = userRepo.getUserByName(personName);

        if(user){
          speechOutput = `${personName} is on the ${user.team.name} team.`;
        } else {
          speechOutput = `Looks like i'm not tracking the team assignment for ${personName}. Please try someone else.`;
        }
    } else {
        speechOutput = 'You did not specify which person you were talking about, please specify by saying, which team is Mario on.';
    }

    callback(sessionAttributes,
        _buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}


// helpers //

function _formatPersonName(name){
    return name.split("'")[0]; // remove possesive s
}

function _buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText
            },
        },
        shouldEndSession
    };
}