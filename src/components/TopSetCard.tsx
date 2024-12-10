const TopSetCard = ({
  training,
  onDelete,
}: {
  training: any;
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="bg-white shadow-md rounded overflow-hidden p-4">
      <h3 className="text-lg font-semibold text-gray-800">
        {training.exerciseType}
      </h3>
      <p className="text-gray-600">Weight: {training.topSetWeight}kg</p>
      <p className="text-gray-600">Reps: {training.topSetReps}</p>
      <p className="text-gray-600">Volume: {training.volume}</p>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => onDelete(training.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TopSetCard;
