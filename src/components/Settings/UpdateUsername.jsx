import ButtonSetting from "./ButtonSetting";

const UpdateUsername = () => {
  return (
    <div className="py-6">
      <h2 className="font-bold text-lg  mb-5">Username</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          className="input w-full max-w-xs bg-gray-700 drop-shadow-sm border border-gray-600"
        />
      </div>
      <ButtonSetting />
    </div>
  );
};

export default UpdateUsername;
