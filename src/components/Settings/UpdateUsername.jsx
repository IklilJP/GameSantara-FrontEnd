import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import ButtonSetting from "./ButtonSetting";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailUser } from "../../store/authSlice";
import UpdateInputForm from "./UpdateInputForm";

const UpdateUsername = ({ setIsError, setIsSuccess }) => {
  const user = useSelector((state) => state.auth.userDetail);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleUpdateUsername = async () => {
    if (inputValue.trim() === "") {
      setIsError("Masukan Input");
      return;
    }

    if (user?.username === inputValue) {
      setIsError("Username tidak boleh sama dengan yang sebelumnya");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.patch("/user/username", {
        username: inputValue,
      });

      if (response.data.status === 200) {
        setIsSuccess("Username berhasil diperbarui");
        dispatch(fetchDetailUser());
      }
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <UpdateInputForm
        title={"Username"}
        isLoading={isLoading}
        handleButton={handleUpdateUsername}
        defaultValue={user?.username}
        setInputValue={setInputValue}
      />
    </div>
  );
};

export default UpdateUsername;
