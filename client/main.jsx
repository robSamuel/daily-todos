import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { DailyTodos } from '/imports/ui/DailyTodos';

Meteor.startup(() => {
  render(<DailyTodos />, document.getElementById('react-target'));
});
