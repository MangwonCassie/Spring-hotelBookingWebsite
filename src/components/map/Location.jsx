import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { saveHotel } from "../utils/ApiFunctions";

const Location = () => {
  const [searchKeyword, setSearchKeyword] = useState("호텔을 검색해보세요");
  const [markers, setMarkers] = useState([]); // 마커 배열 추가
  const [places, setPlaces] = useState([]); // 검색된 장소 배열 추가

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value); // 검색어 업데이트
  };

  const handleSaveHotel = async (place) => {

    console.log("Saving hotel:", place);

    const success = await saveHotel(
      place.id,
      place.place_name,
      place.road_address_name,
      place.phone
    );

    if (success) {
      alert("호텔 정보가 저장되었습니다.");
    } else {
      alert("호텔 정보 저장에 실패했습니다.");
    }
  };


  useEffect(() => {
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);
    var markerPosition = new kakao.maps.LatLng(
      37.365264512305174,
      127.10676860117488
    );


    // 마커를 클릭하면 장소명을 표출할 인포윈도우
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places(map);


    // 키워드로 장소를 검색합니다
    ps.keywordSearch(searchKeyword, placesSearchCB);

    // 카테고리로 호텔을 검색합니다
    ps.categorySearch('AD5', placesSearchCB, { useMapBounds: true });


    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        console.log("검색된 호텔의 갯수는 " + data.length + "개 입니다.")
        for (var i = 0; i < data.length; i++) {
          console.log("다음은 " + (i + 1) + "번째 호텔 정보입니다.")
          console.log(data[i]);
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
        setPlaces(data); // 검색된 장소 배열 업데이트

      }
    }

    function displayMarker(place) {

      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });

      marker.setMap(map);

      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
      });
    }

  }, [searchKeyword]);

  const searchPlaces = () => {
    console.log("검색어:", searchKeyword);
    // 기존 마커 삭제
    markers.forEach((marker) => {
      marker.setMap(null); // 지도에서 마커 제거
    });
    setMarkers([]); // 마커 배열 초기화
  };

  return (
    <>
      <div>
        <InputWrapper>
          {/* 검색창 UI */}
          <StyledInput
            type="text"
            value={searchKeyword}
            onChange={handleInputChange}
            placeholder="맛집을 검색해보세요"
          />
          <SearchButton onClick={searchPlaces} >검색</SearchButton>
          <SearchButton onClick={searchPlaces} >Only Hotel</SearchButton>
        </InputWrapper>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

          }}
        >
          <div id="map" style={{
            width: "800px", height: "500px", paddingBottom: "30px", borderStyle: "solid", borderColor: "rgb(169, 77, 123)",
            borderRadius: "30px"
          }}></div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column", // 세로로 정렬
          alignItems: "center",
        }}>
        {/* 검색된 장소 정보를 표시할 div들 */}
        {places.map((place, index) => (
          <PlaceInfo key={index}>
            <h4>{place.place_name}</h4>
            <p>{place.road_address_name}</p>
            <p>{place.phone}</p>
            <SearchButton onClick={() => handleSaveHotel(place)}>예약</SearchButton>
          </PlaceInfo>
        ))}
      </div>
    </>
  );
};

const InputWrapper = styled.div`
    display: flex; 
    justify-content: center;
    align-items: center;
`

const StyledInput = styled.input`
    width: 500px;
    height: 40px;
    border-radius: 30px;
    border-style: none;
    background-color:  rgb(169, 77, 123);
    color: #fff;
    padding-left: 20px;
    font-weight: 700;
    font-size: 18px;
    margin: 40px 10px;
    /*margin: 40px auto; 이러면 검색창에 공간이 띄어짐.  */
  `;

const SearchButton = styled.button`
  width: 150px;
  height: 40px;
  border-radius: 30px;
  border-style: solid;
  border-color:  rgb(169, 77, 123);
  background-color: #fff;
  color:  rgb(169, 77, 123);
  font-weight: 700;
  font-size: 18px;
`
const PlaceInfo = styled.div`
  width: calc(800px / 1 - 20px);
  border: 3px solid rgb(169, 77, 123); /* border-width를 3px로 지정 */
  border-radius: 30px;
  border-style: solid;
  margin: 20px;
  padding: 20px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
`;

export default Location;