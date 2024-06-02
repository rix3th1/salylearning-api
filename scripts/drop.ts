import { exec } from 'child_process';
import { database, host, password, port, user } from './constants';

exec(
  `mysql -u ${user} -p${password} -h${host} -P${port} -e "SHOW DATABASES;"`,
  (error, stdout) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    const databases = stdout.split('\n');
    if (!databases.includes(database)) {
      console.error(`Database ${database} does not exist`);
      return;
    }

    // execute mysqldump command and SQL inline
    const command = `mysql -u ${user} -p${password} -h${host} -P${port} ${database} -e "DROP DATABASE ${database};"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }

      console.info(`stdout: ${stdout}`);
      console.info(`stderr: ${stderr}`);
    });

    console.info('Dropping database...');
  },
);
