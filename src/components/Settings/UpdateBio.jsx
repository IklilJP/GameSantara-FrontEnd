import { useDispatch, useSelector } from "react-redux";
import ButtonSetting from "./ButtonSetting";
import { useState } from "react";
import { fetchDetailUser } from "../../store/authSlice";
import axiosInstance from "../../api/axiosInstance";

const UpdateBio = ({ setIsError, setIsSuccess }) => {
  const user = useSelector((state) => state.auth.userDetail);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateBio = async () => {
    if (inputValue === "") {
      setIsError("Masukan Input");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.patch("/user/bio", {
        bio: inputValue,
      });

      if (response.data.status === 200) {
        setIsSuccess("Bio berhasil diperbarui");
        dispatch(fetchDetailUser());
      }
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-6">
      <div>
        <h2 className="font-bold text-lg  mb-5">Bio</h2>
        <textarea
          defaultValue={user?.bio}
          onChange={(e) => setInputValue(e.target.value)}
          className="textarea bg-gray-700 w-5/12"
          placeholder="Bio"></textarea>

        <ButtonSetting handleButton={handleUpdateBio} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default UpdateBio;
