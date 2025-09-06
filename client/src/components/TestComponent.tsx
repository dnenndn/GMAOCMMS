const TestComponent: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-600 bg-red-100 p-4 rounded">
        Tailwind Test - This should be blue text with red background
      </h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Test Button
      </button>
      <div className="bg-green-200 p-4 mt-4 rounded">
        Green background test
      </div>
    </div>
  );
};

export default TestComponent;