import * as fs from 'fs';
import ical from 'ical-generator';
import path from 'path';

fs.readdir("src", (err, files) => {
    if (err) {
        console.log(err);
        return;
    }

    for (const file of files) {
        if (path.extname(file) != '.json' || file.endsWith('.sample.json')) {
            continue;
        }
        console.log(file);

        const data = JSON.parse(fs.readFileSync(path.join("src", file), "utf8"));
        const calendar = ical({ name: 'Schedule' });

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
        const icalFile = path.basename(file, path.extname(file)) + '.ics';
        fs.writeFileSync(path.join("docs", icalFile), icalContent);
    }
})

