# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Spring-hotelBookingWebsite
Refactoring Project 


<h3>목표 및 소개 )</h3>
Kakao Map API를 활용하여 '키워드로 호텔 검색하고 목록으로 표출하기' 기능을 구현 (호텔만 따로 api 불러올 수 있는지 미리 체크)<br>
useState 를 사용하여 호텔 정보와 검색 키워드를 관리<br>
useEffect를 이용하여 검색어가 변경될 때 마다 지도를 갱신하고 맛집 정보 관리<br>
검색 결과를 지도에 표시하고 페이지네이션을 구현<br>
검색어를 입력이 발생할때마다 handleInputChange 함수를 호출하여 검색 키워드 업데이트<br>
JSX를 통해 UI를 렌더링 하고 스타일링은 styled-components를 이용하여 적용 (기본은 css 스타일링이나 맵 관련부터는 라이브러리 적용예정)<br>


- 기초 렌더링 구현
- apis.map.kakao.com/web/guide/     & developers.kakao.com/   & apis.map.kakao.com/   3가지 주소로 웹페이지 등록 및 도메인 등록 후 javascript 키 <br>
- index.html에 <head> 연결 <br>


```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=a5b7cadd2"이 부분 javascript key부분"></script>
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx">


    </script>
  </body>
</html>
```

- 리액트로 Location 부분 뼈대 설정<br>

![first map  rendering](https://github.com/MangwonCassie/Spring-hotelBookingWebsite-Front/assets/129250487/04b01895-9d36-4e00-abe9-23d6c057c6f1)

<br>


- 관련 코드 


```import React, { useEffect } from 'react'

const Location=()=>{

  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3
    };
    var map = new kakao.maps.Map(container, options);
    }, [])


    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        	<div id="map" style={{width:"800px", height:"600px"}}></div> 
        </div>
    )
}

export default Location;
```

<h4>마커 구현사항 useEffect 함수에 넣어준다.</h4>
- 참고 url (https://apis.map.kakao.com/web/documentation/#Marker_setMap)
<br>
<br>


```    var markerPosition  = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488); 
    var marker = new kakao.maps.Marker({
      position: markerPosition
    });
  marker.setMap(map);
  ```

<br>
<h4>추가 구현해야할 사항</h4>
- 마커 설정<br>
- 키워드로 주변에 호텔 45개 불러올 수 있도록 api 처리하기<br>
- 해당 호텔에 리뷰 쓸 수 있는 거 구현하기<br>
- 내가 방문해서 리뷰를 쓴 호텔이라면 지도에서 마커를 클릭했을 떄 내 리뷰가 함께 카카오맵 정보와 함께 불러오도록 처리하기 <br>
- 카카오 길찾기<br>






