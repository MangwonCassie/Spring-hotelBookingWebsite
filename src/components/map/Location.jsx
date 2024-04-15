import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Location = () => {
  const [searchKeyword, setSearchKeyword] = useState("호텔을 검색해보세요");
  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value); // 검색어 업데이트
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
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);

  return (
    <div>
      <InputWrapper>
        {/* 검색창 UI */}
        <StyledInput
          type="text"
          value={searchKeyword}
          onChange={handleInputChange}
          placeholder="맛집을 검색해보세요"
        />
        <SearchButton >검색</SearchButton>
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
  width: 100px;
  height: 40px;
  border-radius: 30px;
  border-style: solid;
  border-color:  rgb(169, 77, 123);
  background-color: #fff;
  color:  rgb(169, 77, 123);
  font-weight: 700;
  font-size: 18px;
`


export default Location;
