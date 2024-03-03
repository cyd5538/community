![쿼리스트링](https://github.com/cyd5538/community/assets/91642972/e49e82e2-5d08-4d49-96d3-faaddeef1a9e)# Football Community
<div align="center">
    <img src="https://github.com/cyd5538/community/assets/91642972/738d3135-d09f-4f58-9683-f180c61fe590" alt="image" width="800">
</div>

## 개발 기간 🧭
2023-12-12 ~ 2024-02-27
## 프로젝트 소개 💭
해외 축구 팬들을 위한 통합 커뮤니티 사이트입니다. 다양한 해외 축구 리그와 팀의 정보를 한 곳에서 제공하여 팬들이 편리하게 접근할 수 있도록 합니다. 
기존의 게시판 기능에 더불어 전체 채팅, 리그 순위, 팀 순위, 경기 일정 등을 종합하여 제공해 축구 팬들이 소통하고 최신 정보를 얻을 수 있습니다. 

## Stacks ✨
### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-%23007ACC.svg?style=flat&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/Git-%23F05032.svg?style=flat&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-%23181717.svg?style=flat&logo=github&logoColor=white)
### Frontend
![React](https://img.shields.io/badge/React-%2361DAFB.svg?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%231a202c.svg?style=flat&logo=tailwind-css&logoColor=38b2ac)
![React Query](https://img.shields.io/badge/React%20Query-%23FF5555.svg?style=flat&logo=react-query&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-%2380D0C7.svg?style=flat&logo=zustand&logoColor=white)

### Backend
![Express](https://img.shields.io/badge/Express-%23404d59.svg?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white)

### storage
![Firebase](https://img.shields.io/badge/Firebase-%23FFCA28.svg?style=flat&logo=firebase&logoColor=black)

## 페이지 구성

|                |                                                          |
|----------------|----------------------------------------------------------------|
| 메인           | 채팅방 목록                                                    |
| ![메인](https://github.com/cyd5538/community/assets/91642972/406adbb3-c36c-42c7-b86e-6242fe71eaab) | ![채팅방 목록](https://github.com/cyd5538/community/assets/91642972/ee11fbb3-3aa3-47df-8f2b-a8c6d6f38347) |
| 채팅방         | 풋볼                                                           |
| ![채팅방](https://github.com/cyd5538/community/assets/91642972/e0e3f4dd-973b-4581-9111-84cceb43938e) | ![풋볼](https://github.com/cyd5538/community/assets/91642972/74fb818f-873c-4c25-ab50-eddeb4eb788c) |
| 검색           | 회원가입                                                               |
| ![검색](https://github.com/cyd5538/community/assets/91642972/e5ee0a51-f02c-455b-a73f-9999f4698b3c) |![회원가입](https://github.com/cyd5538/community/assets/91642972/c41130a8-2449-4271-90c6-d8851c2c0988) |
| 로그인          | 게시물                                                               |
| ![image](https://github.com/cyd5538/community/assets/91642972/41d49a81-a696-4d0e-88d6-e84574a27d61) ||

## 주요 기능
| 기능              | 설명                                                               | 관련 포스트                          |
|------------------|-------------------------------------------------------------------|------------------------------------|
| 무한 스크롤      | React-query를 사용하여 무한 스크롤을 구현합니다.                 | [관련 포스트](https://yjin.vercel.app/posts/react-query-infinite) |
| 유효성 체크      | React-hook-form과 Zod를 활용하여 사용자 입력값의 유효성을 체크합니다. | [관련 포스트](https://yjin.vercel.app/posts/zod-reacthookform) |
| 정렬 기능        | 게시물을 최신순, 댓글순, 좋아요순으로 가져올 수 있습니다.              | |
| 실시간 채팅      | Socket을 활용하여 실시간 채팅 기능을 구현합니다.                    |  |
| 데이터 필터링    | URL의 쿼리 스트링을 사용하여 특정 데이터를 가져오는 기능을 추가합니다. |  |

## 주요 동작
축구와 관련된 API가 1분에 5번만 무료, 그 이후는 유료이기 때문에 gif로 남깁니다.
|                |                                                          |
|----------------|----------------------------------------------------------------|
| 무한스크롤          | 글쓰기                                                  |
|![무한스크롤](https://github.com/cyd5538/community/assets/91642972/e83c8f71-cfef-41d7-bc81-5f088e1ad4d5) | ![글쓰기](https://github.com/cyd5538/community/assets/91642972/97030486-9616-4637-988c-3366ed918ade)|
| 풋볼페이지 쿼리스트링          | 채팅                                                  |
|![쿼리스트링](https://github.com/cyd5538/community/assets/91642972/10a5504d-7bc5-46e3-a07e-6b646f16da66) | ![채팅](https://github.com/cyd5538/community/assets/91642972/f85b42d7-29ee-4e4d-80c1-e3de72708506)|
| 검색기능         |  프로필 수정                                                 |
|![검색기능](https://github.com/cyd5538/community/assets/91642972/32783aba-6c7c-4a6e-84bd-734e70db0085) | ![프로필-바꾸기](https://github.com/cyd5538/community/assets/91642972/89c65b31-2bce-4740-adcf-8d821aff96f4) |
| 내 글 수정         |                                                  |
|![글-수정하기](https://github.com/cyd5538/community/assets/91642972/6f73e115-68f3-4414-a4aa-3e77406542b3) ||






## 아키텍쳐
### 폴더 구조
```
\---src
    |   App.css
    |   App.tsx
    |   firebase.ts
    |   index.css
    |   main.tsx
    |   vite-env.d.ts
    |
    +---components // 페이지별로 폴더 만들어 구조화
    |   |   ProtectedRoute.tsx
    |   |
    |   +---Chat
    |   |       ChatContainer.tsx
    |   |       ChatDelete.tsx
    |   |       ChatInfo.tsx
    |   |       ChatInput.tsx
    |   |       ChatTitle.tsx
    |   |       ChatUser.tsx
    |   |
    |   +---Football
    |   |       LeagueRank.tsx
    |   |       LeagueRankSelect.tsx
    |   |       LeagueScoreRank.tsx
    |   |       LeagueScoreTable.tsx
    |   |       LeagueScoreTableHead.tsx
    |   |       LeagueTable.tsx
    |   |       LeagueTableHead.tsx
    |   |       LeagueTeamModal.tsx
    |   |       LeagueTeamModalSchedule.tsx
    |   |       LeagueTeamModalSquad.tsx
    |   |       LeagueTeamModalSquadSelect.tsx
    |   |       LeagueTeamPlayerSelect.tsx
    |   |       LeagueTeamScheduleCarousel.tsx
    |   |       LeagueTeamSquadBody.tsx
    |   |       LeagueTeamSquadHead.tsx
    |   |       LeagueYearSelect.tsx
    |   |
    |   +---Home
    |   |       Allposts.tsx
    |   |       HomeLeagueSelect.tsx
    |   |       HomeLeagueTable.tsx
    |   |       HomeLeagueTableBody.tsx
    |   |       HomeLeagueTableHead.tsx
    |   |       Post.tsx
    |   |       PostComment.tsx
    |   |       PostCommentDelBtn.tsx
    |   |       PostCommentDisLike.tsx
    |   |       PostCommentForm.tsx
    |   |       PostCommentLike.tsx
    |   |       PostCommentList.tsx
    |   |       PostCommentUpdateBtn.tsx
    |   |       PostDisLike.tsx
    |   |       PostLike.tsx
    |   |       Posts.tsx
    |   |       Searchbar.tsx
    |   |
    |   +---Modal
    |   |       PostModal.tsx
    |   |       PostModalImage.tsx
    |   |       PostModalVideo.tsx
    |   |
    |   +---Myprofile
    |   |       MyInfo.tsx
    |   |       MyInfoImage.tsx
    |   |       Mypost.tsx
    |   |       MypostComment.tsx
    |   |       MypostDelbtn.tsx
    |   |       Myposts.tsx
    |   |       MypostsPage.tsx
    |   |       MyprofileTab.tsx
    |   |
    |   +---Room
    |   |       RoomCard.tsx
    |   |       RoomCreateBtn.tsx
    |   |       RoomList.tsx
    |   |       RoomModal.tsx
    |   |
    |   +---search
    |   |       SearchPage.tsx
    |   |       SearchResult.tsx
    |   |
    |   +---sidebar
    |   |       Sidebar.tsx
    |   |       Sidebars.tsx
    |   |
    |   \---ui // shadn/ui 파일
    |           alert-dialog.tsx
    |           button.tsx
    |           card.tsx
    |           carousel.tsx
    |           Container.tsx
    |           customToast.tsx
    |           input.tsx
    |           label.tsx
    |           Loading.tsx
    |           Modal.tsx
    |           pagination.tsx
    |           ScrollTop.tsx
    |           select.tsx
    |           sheet.tsx
    |           table.tsx
    |           tabs.tsx
    |           textarea.tsx
    |
    +---hook // 커스텀 훅
    |       getUser.tsx
    |       useScroll.tsx
    |       useThrottle.tsx
    |       useWindowWidth.tsx
    |
    +---lib // api 파일
    |       commentApi.ts
    |       footballApi.ts
    |       likeApi.ts
    |       postApi.ts
    |       roomApi.ts
    |       socket.ts
    |       userApi.ts
    |       utils.ts
    |
    +---pages // 페이지
    |       Chat.tsx
    |       ChatRoom.tsx
    |       Football.tsx
    |       Home.tsx
    |       Login.tsx
    |       Myprofile.tsx
    |       Register.tsx
    |       Search.tsx
    |
    +---store // 전역관리
    |       useAuth.tsx // 인증 상태 관리
    |       useRoomModel.tsx // 채팅방 모달 상태 관리
    |       userPostModel.tsx // 게시물 모달 상태 관리
    |       useTeamModel.tsx // 팀 모달 상태 관리 
    |
    +---types // 타입스크립트 타입
    |       etc.ts 
    |       foontballTypes.ts
    |       types.ts
    |
    \---utils // 기타
            formSchema.ts  // 회원가입 양식 스키마
            league.ts // 리그 데이터
```
