'use client';
import { useEffect, useState } from 'react';
import {
  deleteTopSetTraining,
  fetchTopSetTrainings,
} from '../../apis/topSetService';
import TopSetCard from '../../components/TopSetCard';
import { useRouter } from 'next/navigation';

const TopSetListPage = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadTrainings = async () => {
      try {
        const data = await fetchTopSetTrainings();
        setTrainings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadTrainings();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteTopSetTraining(id);
      setTrainings((prev) => prev.filter((training) => training.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
  
      <h1 className="text-2xl font-bold text-center mb-6">Top Set Trainings</h1>
      <div style={{ maxWidth: '350px', margin: '0 auto' }}>
        {' '}
        탑세트 훈련은 특정 운동에서 개인의 최고 중량(또는 목표 중량)을 기반으로
        고강도 세트를 수행하고, 이를 통해 점진적 과부하를 달성하는 훈련
        방식입니다.<br></br>
        주요 특징은 다음과 같습니다.<br></br>
        주요 운동 선택: 벤치프레스, 데드리프트, 밀리터리프레스, 스쿼트를
        기본으로 합니다. <br></br>목표 중량 설정:<br></br> 각 운동마다 목표
        중량(targetWeight)을 설정합니다.<br></br> 탑세트 기록:<br></br> 목표
        중량에서 성공한 세트와 반복 수를 기록합니다. <br></br>진행 추적:{' '}
        <br></br>이전 기록 대비 중량/세트/반복 수의 개선 여부를 추적합니다.
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => router.push('/top-set/new')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Record
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainings.map((training) => (
          <TopSetCard
            key={training.id}
            training={training}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TopSetListPage;
