// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://52.79.183.89/api/:path*', // NestJS 서버 주소
      },
    ];
  },
};
