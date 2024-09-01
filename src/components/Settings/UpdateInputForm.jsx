import ButtonSetting from "./ButtonSetting";

const UpdateInputForm = ({
  title,
  defaultValue,
  setInputValue,
  handleButton,
  isLoading,
}) => {
  return (
    <div className="py-6">
      <h2 className="font-bold text-lg  mb-5">{title}</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          defaultValue={defaultValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input w-full max-w-xs bg-gray-700 drop-shadow-sm border border-gray-600"
        />
      </div>
      <ButtonSetting handleButton={handleButton} isLoading={isLoading} />
    </div>
  );
};

export default UpdateInputForm;
