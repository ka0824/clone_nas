##  프로젝트 설명
Synology Nas 클론 코딩 입니다.

<br/>

## 시연 영상


![clone_nas](https://user-images.githubusercontent.com/79782594/222339248-8de6093a-f971-4601-b31d-0bfe52570eb0.gif)

<br />

## 사용 스택
react, redux

<br />

## 실행 방법

```
npm run dev // 클라이언트 페이지 실행
npm run server // json-server 실행
```
id: "test", password: "1234"로 로그인 

## 구현 기능

### 로그인 <br />
json-server로 간이 구현 <br />
로그인 애니메이션 적용 <br />

### 메인 화면 <br />
아이콘 추가, 삭제, 위치 이동 <br />
아이콘 드래그 선택 기능 <br />
컨텍스트 메뉴 (새 창 열기, 아이콘 삭제) <br />

### 모달 창 <br />
redux로 모든 모달창, 하나의 상태 값(배열)으로 관리 <br />
모달창 크기 조절 <br />
모달창 최소화 기능 <br />
모달창 사용 순서에 따라 z-index 변경 기능 <br />
