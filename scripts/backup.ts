const { exec } = require('child_process');
import { database, host, password, port, user } from './constants';

// execute mysqldump command
const command = `mysqldump -u ${user} -p${password} --ssl=0 -h${host} -P${port} ${database} > backup.sql`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  console.info(`stdout: ${stdout}`);
  console.info(`stderr: ${stderr}`);
});

console.info('Doing backup...');
console.info('Backup file is backup.sql');
