module.exports = {
  apps: [
    {
      name: 'nestjs',
      script: 'nest',
      args: 'start',
      env: {
        NODE_ENV: 'development',
      },
      watch: true,
      exec_mode: 'fork',
      merge_logs: true,
      listen_timeout: 5000,
      kill_timeout: 5000,
    },
  ],
};
