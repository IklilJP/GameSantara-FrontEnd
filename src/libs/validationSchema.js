import * as Yup from "yup";

export const validationSchemaRegsiter = Yup.object().shape({
  fullName: Yup.string()
    .required("Nama lengkap diperlukan")
    .min(4, "Nama minimal 4 karakter")
    .max(35, "Nama maksimal 35 karakter")
    .test(
      "noStartingSpace",
      "Tidak boleh ada spasi di awal",
      (value) => value && !value.startsWith(" "),
    ),
  username: Yup.string()
    .required("Username diperlukan")
    .min(4, "Username minimal 4 karakter")
    .max(20, "Username maksimal 20 karakter")
    .matches(/^[a-z]+$/, "Username harus menggunakan huruf kecil")
    .test(
      "noStartingSpace",
      "Tidak boleh ada spasi di awal",
      (value) => value && !value.startsWith(" "),
    ),
  email: Yup.string()
    .required("Email harus terisi")
    .email("Email tidak valid")
    .test(
      "noStartingSpace",
      "Tidak boleh ada spasi di awal",
      (value) => value && !value.startsWith(" "),
    ),
  password: Yup.string()
    .required("Password harus terisi")
    .min(8, "Password minimal 8 karakter")
    .max(20, "Password maksimal 20 karakter")
    .test(
      "noStartingSpace",
      "Tidak boleh ada spasi di awal",
      (value) => value && !value.startsWith(" "),
    ),
  confirmPassword: Yup.string()
    .required("Konfirmasi password diperlukan")
    .oneOf([Yup.ref("password"), null], "Password tidak cocok")
    .min(8, "Password minimal 8 karakter")
    .max(20, "Password maksimal 20 karakter")
    .test(
      "noStartingSpace",
      "Tidak boleh ada spasi di awal",
      (value) => value && !value.startsWith(" "),
    ),
});

export const validationSchemaLogin = Yup.object().shape({
  email: Yup.string()
    .required("Email harus terisi")
    .email("Email tidak valid")
    .matches(/^\S*$/, "Tidak boleh ada spasi di awal"),
  password: Yup.string()
    .required("Password harus terisi")
    .min(8, "Password minimal 8 karakter")
    .max(20, "Password maksimal 20 karakter")
    .matches(/^\S*$/, "Tidak boleh ada spasi di awal"),
});
