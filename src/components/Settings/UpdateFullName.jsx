import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailUser } from "../../store/authSlice";
import UpdateInputForm from "./UpdateInputForm";

const UpdateFullName = ({ setIsError, setIsSuccess }) => {
  const user = useSelector((state) => state.auth.userDetail);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateUsername = async () => {
    if (inputValue === "") {
      setIsError("Masukan Input");
      return;
    }

    if (user?.fullName === inputValue) {
      setIsError("FullName tidak boleh sama dengan yang sebelumnya");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.patch("/user/fullname", {
        fullName: inputValue,
      });

      if (response.data.status === 200) {
        setIsSuccess("FullName berhasil diperbarui");
        dispatch(fetchDetailUser());
      }
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <UpdateInputForm
        title={"FullName"}
        isLoading={isLoading}
        handleButton={handleUpdateUsername}
        defaultValue={user?.fullName}
        setInputValue={setInputValue}
      />
    </div>
  );
};

export default UpdateFullName;
