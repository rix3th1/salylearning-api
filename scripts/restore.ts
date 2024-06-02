import { exec } from 'child_process';
import { database, host, password, port, user } from './constants';

// execute mysqldump command
const command = `mysql -u ${user} -p${password} -h${host} -P${port} ${database} < backup.sql`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  console.info(`stdout: ${stdout}`);
  console.info(`stderr: ${stderr}`);
});
