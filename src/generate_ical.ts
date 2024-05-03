import * as fs from 'fs';
import ical from 'ical-generator';

const data = JSON.parse(fs.readFileSync('src/schedule.json', 'utf8'));
const calendar = ical({name: 'Schedule'});

data.events.forEach(event => {
    calendar.createEvent({
        start: new Date(event.start),
        end: new Date(event.end),
        summary: event.summary,
        description: event.description || '',
        location: event.location || ''
    });
});

const icalContent = calendar.toString();
fs.writeFileSync('dist/schedule.ics', icalContent);