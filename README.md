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
> 사용자가 검색 버튼을 누르면 sessionStorage에 저장이 되며 검색 상자에 최근 검색어 목록이 나오게 됩니다. 최근 검색어 목록은 같은 검색어가 있다면 최근 검색의 순서에 맞게끔 삭제 후 첫번째 배열로 추가됩니다. 최대 7개까지 보일 수 있으며 그 이상 저장될 경우 배열의 마지막. 즉, 가장 오래된 검색어부터 삭제합니다.


### `추천 검색어 API 호출별 로컬 캐싱`
- 사용자의 입력값이 없거나 한글 음절이 완성되지 않은 경우(즉, 자음 또는 모음만 입력된 경우), 데이터 요청을 하지 않아 불필요한 **네트워크 트래픽을 최소화**합니다.
- 한글의 경우 완전한 음절이 완성되지 않으면(자음/모음만 입력 시) 해당 부분을 **필터링**하여 요청합니다.
   >   - **ex) 감ㅁ기 → 감기 , 감기ㅁ → 감기**
- 디바운스 기법을 활용하여 500ms 동안 타이핑 멈춤 감지 시에만 데이터를 실제로 요구함으로써 **서버와 클라이언트 간의 부담**을 줄입니다.
- 모든 API 응답은 **로컬에서 캐싱**되며, 이후 동일한 요청이 발생하면 API를 호출하는 대신 캐시에서 데이터를 가져옵니다.
- 캐싱된 데이터는 **12시간 후 만료**됩니다.

### `키보드만으로 추천 검색어 이동`
- 사용자가 추천된 검색어 중 **원하는 항목으로 이동하고 선택**할 수 있도록, 위/아래 방향키(ArrowUp/ArrowDown)와 엔터 키의 조합을 활용할 수 있습니다.

## ⭐️ 과제 구현 방법 ⭐️

### 1. 로컬 캐싱 구현 방법
- **로컬 캐싱 구현 목표** - 로컬캐싱을 활용하여 API 호출 횟수를 줄이는 것을 목표로하여 구현하였습니다.
  
  -
- **변경 된 데이터 값을 적절한 시점에 가져오는 방법**
  
    - 캐시 된 데이터를 찾았으나 expireTime이 현재 시간 기준 만료 되었다면 리패칭 하여 받아온 데이터로 교체합니다.

### 2. 입력별 API 호출 횟수를 줄이는 전략
- 입력값이 아무것도 없으면 요청하지 않습니다.
- 디바운싱을 활용해 500ms이상 타이핑이 멈추면 데이터를 요청하도록 유도하여 불필요한 요청을 줄였습니다.
- 한글의 경우 완전한 음절이 완성되지 않으면(자음/모음만 입력 시) 해당 부분을 필터링하여 요청합니다.
    <details>
    <summary><b>👈코드 보기</b></summary>
        <div markdown="1">
            <ul>
              https://github.com/TaekJinJang/recommend-search/blob/34801cbaeb4b292d63770bcba451c1c452d8aa00/src/utils/regex.ts#L1-L5C3
            </ul>
        </div></details>
  
- API 요청 결과는 캐싱하고, 이후 동일한 요청이 들어오면 API 요청 대신 캐싱된 값을 활용합니다.(캐싱데이터 expire time: 12시간)
  <details>
    <summary><b>👈코드 보기</b></summary>
        <div markdown="1">
            <ul>
              https://github.com/wanted-pre-onboarding-12th-11/pre-onboarding-12th-3-11/blob/fca886da3c84a7fb7575d44df6a96b4b5b0ab1a4/src/utils/searchTrieCache.ts#L146-L187
            </ul>
        </div></details>
  

### 3. 키보드를 이용한 추천 검색어 기능 사용법
- 검색어를 입력했을 때 추천 검색어가 없으면, '추천 검색어가 없습니다'라는 문구가 출력됩니다.
- 추천 검색어가 있는 경우 키보드 위/아래 방향키로 이동 가능하고, 엔터 키를 눌러 검색할 수 있습니다.
    <details>
    <summary><b>👈코드 보기</b></summary>
        <div markdown="1">
            <ul>
              https://github.com/wanted-pre-onboarding-12th-11/pre-onboarding-12th-3-11/blob/9ef6d4375164faabf717b3f8a7ccfb8e54b94baf/src/hooks/useKeyboard.ts#L3-L43
            </ul>
        </div></details>


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

 
