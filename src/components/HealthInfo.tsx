import React, { useState } from 'react';
import { getHealthNews } from '../apis/newsService'; // 수정된 API 함수 임포트

const HealthInfo = () => {
  const [hypertensionData, setHypertensionData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDataVisible, setIsDataVisible] = useState(false); // 토글 상태 관리

  // 버튼 클릭 시 데이터 fetch
  const fetchData = async () => {
    if (isDataVisible) return; // 데이터가 이미 보이면 fetch하지 않음
    setLoading(true); // 로딩 상태 설정
    try {
      const data = await getHealthNews('hypertension'); // 고혈압 관련 데이터를 가져옵니다.
      setHypertensionData(data); // 가져온 데이터를 상태에 저장
      setIsDataVisible(true); // 데이터가 보여지도록 설정
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  // 데이터 토글
  const toggleDataVisibility = () => {
    setIsDataVisible(!isDataVisible); // 토글 상태 변경
    fetchData();
  };

  return (
    <div className="container mx-auto p-4">
      {/* 데이터 토글 버튼 */}
      <div className="mb-4 flex justify-center">
        <button
          onClick={toggleDataVisibility} // 데이터 표시 토글
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          {isDataVisible ? '데이터 숨기기' : '고혈압 정보 '}
        </button>
      </div>
      {/* 로딩 상태 표시 */}
      {loading && <p className="text-center">로딩 중...</p>}

      {/* 데이터가 있을 경우 리스트 표시 */}
      {isDataVisible && hypertensionData.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-3">고혈압에 좋은 음식</h3>
          <ul className="list-disc pl-6 space-y-2">
            {hypertensionData.map((item, index) => (
              <li key={index} className="text-lg text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HealthInfo;
