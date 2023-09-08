# 한국 임상정보 검색 기능 클론
- 검색 + 검색어 추천 + 최근 검색어 + 데이터 캐싱 기능을 구현했습니다. 

## 🙂 시작 가이드
* 배포 주소

  🔗 http://wanted-pre-onboarding-2week-personal.s3-website.ap-northeast-2.amazonaws.com

* 프로젝트 실행 방법
  ```
   $ npm install
   $ npm start
  ```

## 📁 디렉토리 구조
```
📦src
 ┣ 📂apis
 ┣ 📂components
 ┣ 📂constants
 ┣ 📂hooks
 ┣ 📂pages
 ┣ 📂styles
 ┣ 📂types
 ┣ 📂utils
 ```
## ✔️ 주요 기능

### `검색어 추천`
- 사용자의 편의를 위해 질환명에 대한 검색어 추천 기능을 제공합니다.
- 입력한 검색어에 대응하는 추천 검색어가 없을 경우, '검색어 없음' 안내 문구를 출력합니다.

### `최근 검색어`
- 사용자가 검색창에 아무 입력도 하지 않았을 때, 최근 검색했던 질환명을 최근 검색어로 제공합니다.
- 만약 사용자가 아직 어떠한 검색도 수행하지 않았다면, '최근 검색어 없음' 이라는 안내 문구를 출력합니다.

### `추천 검색어 API 호출별 로컬 캐싱`
- 사용자의 입력값이 없거나 한글 음절이 완성되지 않은 경우(즉, 자음 또는 모음만 입력된 경우), 데이터 요청을 하지 않아 불필요한 **네트워크 트래픽을 최소화**합니다.
- 한글의 경우 완전한 음절이 완성되지 않으면(자음/모음만 입력 시) 해당 부분을 **필터링**하여 요청합니다.
   >   - **ex) 감ㅁ기 → 감기 , 감기ㅁ → 감기**
- 디바운스 기법을 활용하여 500ms 동안 타이핑 멈춤 감지 시에만 데이터를 실제로 요구함으로써 **서버와 클라이언트 간의 부담**을 줄입니다.
- 모든 API 응답은 **로컬에서 캐싱**되며, 이후 동일한 요청이 발생하면 API를 호출하는 대신 캐시에서 데이터를 가져옵니다.
- 캐싱된 데이터는 **5분 후 만료**됩니다.

### `키보드만으로 추천 검색어 이동`
- 사용자가 추천된 검색어 중 **원하는 항목으로 이동하고 선택**할 수 있도록, 위/아래 방향키(ArrowUp/ArrowDown)와 엔터 키의 조합을 활용할 수 있습니다.

## 🔫 트러블 슈팅
- [Notion 링크](https://motley-bird-51b.notion.site/ed4d9639fd4e4d81ae7a688d70eb5bf8?pvs=4) 참고

## 💡 기술스택 

### Development

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">

### Library
<img src="https://img.shields.io/badge/styled%20components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/Axios-DA291C?style=for-the-badge&logo=axios&logoColor=white">  <img src="https://img.shields.io/badge/React Router Dom-3178C6?style=for-the-badge&logo=&logoColor=white">

### Convention

<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"> <img src="https://img.shields.io/badge/husky-FF4088?style=for-the-badge&logo=hugo&logoColor=white">

### Environment

<img src="https://img.shields.io/badge/visual Studio code-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white"> <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

### Config

<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">

### Communication

<img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

 
