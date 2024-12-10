'use client';
import { useState } from 'react';
import { createTopSetTraining } from '../../../apis/topSetService';
import { useRouter } from 'next/navigation';

const NewTopSetPage = () => {
  const [formData, setFormData] = useState({
    exerciseType: null,
    topSetWeight: 0,
    topSetReps: 0,
  });
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        topSetWeight: Number(formData.topSetWeight),
        topSetReps: Number(formData.topSetReps),
      };
      await createTopSetTraining(payload);
      router.push('/top-set');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mt-10">Add New Top Set</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Exercise Type:
          </label>
          <select
            name="exerciseType"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          >
            <option value="">Select...</option>
            <option value="Bench Press">Bench Press</option>
            <option value="Deadlift">Deadlift</option>
            <option value="Military Press">Military Press</option>
            <option value="Squat">Squat</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Top Set Weight:
          </label>
          <input
            type="number"
            name="topSetWeight"
            value={formData.topSetWeight}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Top Set Reps:
          </label>
          <input
            type="number"
            name="topSetReps"
            value={formData.topSetReps}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTopSetPage;
