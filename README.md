※ 프로젝트 경험: 헬스인 커뮤니티 및 헬스 관련 서비스 (개인프로젝트)
- 프로젝트 개요
  이 프로젝트는 헬스인들을 위한 종합 커뮤니티 및 헬스 관련 서비스를 제공하는 플랫폼입니다. 이 플랫폼은 다양한 기능을 통합하여 사용자가 커뮤니티 내에서 활발히 소통하고, 최신 건강 정보를 습득하며, 개인의 헬스 목표를
  관리할 수 있도록 돕습니다.<br>
- 기술 스택
  프론트엔드: React, Next.js, TypeScript<br>
  백엔드: NestJS, Node.js, Express, TypeScript<br>
  데이터베이스: MySQL<br>
  배포: Docker, AWS EC2<br>
  기타: Puppeteer를 이용한 뉴스 크롤링, JWT를 이용한 인증 및 권한 관리<br>
  
- 주요 기능
  - 회원가입 및 JWT 토큰 기반 로그인<br>
    15분마다 리프래시 토큰으로 액세스토큰을 재발급 받아, 보안적으로 안전하게 설계
    
  - 커뮤니티 게시판
    좋아요 및 댓글 기능: 사용자들이 게시물에 대해 자유롭게 의견을 교환하고 피드백을 받을 수 있습니다.
    토큰 기반 관리 시스템: 각 회원에게 토큰이 할당되며, 이를 통해 게시물, 댓글, 좋아요 등의 활동이 관리됩니다. 이를 통해 커뮤니티 내 활동의 신뢰성과 참여도를 높였습니다.<br>
   

  - 건강 관련 뉴스 크롤링
    자동 뉴스 수집: 최신 건강 관련 뉴스를 자동으로 크롤링하여 대시보드에 실시간으로 표시합니다.
    사용자 맞춤 정보 제공: 사용자는 개인 맞춤형 건강 뉴스를 받아볼 수 있어, 최신 트렌드와 유익한 정보를 놓치지 않도록 도와줍니다.<br>
    

  - 헬스 제품 리뷰 서비스
    사용자 리뷰 기능: 사용자들이 직접 사용해 본 헬스 제품에 대한 리뷰를 작성하고 공유할 수 있습니다.
    리뷰 기반 추천 시스템: 리뷰를 바탕으로 사용자가 관심 있을 만한 제품을 추천받을 수 있어, 구매 결정을 더욱 쉽게 할 수 있습니다.<br>


  - 탑세트 훈련 기록 서비스
    토큰 기반 훈련 기록: 사용자가 자신의 탑세트 훈련을 기록하고, 토큰을 통해 목표 달성을 추적할 수 있습니다.
    목표 설정 및 달성: 사용자는 자신의 훈련 목표를 설정하고, 달성 과정을 시각적으로 확인할 수 있습니다. 이를 통해 동기부여를 높이고 체계적인 훈련 관리가 가능합니다.<br>
 

  - 헬스 전용 챗봇
    Chat GPT API 활용: 헬스 관련 질문과 답변을 제공하는 챗봇을 개발하여 사용자들이 궁금한 점을 실시간으로 해결할 수 있도록 지원합니다.
    사용자 맞춤형 상담: 챗봇은 사용자의 헬스 상태와 목표에 따라 개인 맞춤형 상담과 조언을 제공합니다.<br>
    
    ![화면 캡처 2024-12-17 170622](https://github.com/user-attachments/assets/e8e9b3bf-48bc-4d22-8720-a02ce232363d)
    ![화면 캡처 2024-12-17 170725](https://github.com/user-attachments/assets/8c995798-8613-476a-b821-b6ef14eea4ed)
    ![화면 캡처 2024-12-17 170752](https://github.com/user-attachments/assets/1b10dbd0-a444-4c61-8ba9-a412e815c166)
    ![화면 캡처 2024-12-17 170647](https://github.com/user-attachments/assets/e7152346-f33c-4e69-8612-f25ee6715932)
    ![화면 캡처 2024-12-17 170805](https://github.com/user-attachments/assets/ee7f3b15-1c31-4579-a152-c3482fb2fa71)
    ![화면 캡처 2024-12-17 170816](https://github.com/user-attachments/assets/6289bc3e-a42e-4786-a31b-c7d082b2f127)
    ![화면 캡처 2024-12-17 170706](https://github.com/user-attachments/assets/79c1be27-ca68-4f93-85da-920e339db0eb)


 - API
   ![화면 캡처 2024-12-11 143842](https://github.com/user-attachments/assets/90a10ec5-f9fb-4b3d-9538-e7bf64b974ea)
   ![2](https://github.com/user-attachments/assets/f0364dca-5cc8-4b19-b73c-301a23cc9f46)
   ![3](https://github.com/user-attachments/assets/af76a0df-010a-4477-b2f7-5145a532d7d7)


   

 - 프로젝트 성과<br>
   이 프로젝트는 사용자들에게 헬스 관련 정보를 쉽게 제공하고, 특히 토큰 기반 관리 시스템과 맞춤형 뉴스 제공 기능은 사용자 만족도를 높이는 데 중요한 역할을 했습니다.




This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
