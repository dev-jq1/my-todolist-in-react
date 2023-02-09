# 주간 Todo-list `WEEKLIST` 입니다.
- 월 단위로 구현된 달력을 주 단위로 쪼개어 각 주에 해당하는 일에 Todo-list 를 넣을 수 있습니다.
- 달력 관련 라이브러리 date-fns 를 이용해 주 단위로 구현하였습니다.

- json-server를 이용하여 데이터 CRUD를 구현하였습니다.
- 자원 관리로는 여러 Component 에서 사용 되는 data의 경우 redux-toolkit 을 이용하여 전역적으로 관리하였습니다.

- 톱니바퀴(수정) 클릭 시 input, textarea 에서 바로 수정이 가능하게 작성하였습니다.
- 톱니바퀴(수정) 클릭 시 기존의 content의 개행한 횟수만큼 textarea의 row를 지정하여 모든 content가 보이게 작성하였습니다.

- useRef 를 이용해 DOM으로 접근하여 display 속성 변경을 통해 수정 시 UI 변경하도록 작성하였습니다.
- 데이터 추가시 textarea 에서의 엔터(개행)가 데이터를 불러올 때 적용되지 않는 문제를 해결하였습니다.
- 오늘 버튼 클릭 시 오늘 날짜로 돌아오게 구현하였습니다.
- fetch 대신 axios 를 사용하여 간결하게 작성하였습니다.