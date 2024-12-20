

const SelectAnswerDialog = ({ isOpen, onClose }: { isOpen: boolean, onClose?: ()=> void }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-96 mobile:max-w-[85vw]">
        <h2 className="text-xl font-semibold mb-4">Select an option</h2>
        <p className="mb-4 text-slate-800">
            Please select your answer to go for next question!
            Give it a try or learn it from the explanation. Happy coding!!
        </p>
        <div className="text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectAnswerDialog;
