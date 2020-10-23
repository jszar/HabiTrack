const { spawn } = require('child_process');

const ls = spawn('python', ['./habitrack/src/hello.py']); 

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });