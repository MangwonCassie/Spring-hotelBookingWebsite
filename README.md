# Spring-hotelBookingWebsite
Refactoring Project 


<h3>목표 및 소개 ( 프론트엔드 지도 페이지 담당 )</h3>
Kakao Map API를 활용하여 '키워드로 호텔 검색하고 목록으로 표출하기' 기능을 구현 (호텔만 따로 api 불러올 수 있는지 미리 체크)<br>
useState 를 사용하여 호텔 정보와 검색 키워드를 관리<br>
useEffect를 이용하여 검색어가 변경될 때 마다 지도를 갱신하고 맛집 정보 관리<br>
검색 결과를 지도에 표시하고 페이지네이션을 구현<br>
검색어를 입력이 발생할때마다 handleInputChange 함수를 호출하여 검색 키워드 업데이트<br>
JSX를 통해 UI를 렌더링 하고 스타일링은 styled-components를 이용하여 적용 (기본은 css 스타일링이나 맵 관련부터는 라이브러리 적용예정)<br>
