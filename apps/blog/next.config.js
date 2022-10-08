const withTM = require('next-transpile-modules')(['ui'])

module.exports = withTM({
  reactStrictMode: true,
  images: {
    // next/image 태그를 사용하기 위해선 domains에 이미지가 있는 도메인을 추가해야 한다.
    domains: ['avatars.githubusercontent.com', 's3.us-west-2.amazonaws.com'],
  },
})
