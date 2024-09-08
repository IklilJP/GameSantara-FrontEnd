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
    .matches(/^\S+$/, "Username tidak boleh mengandung spasi")
    .matches(/^[a-z0-9]+$/, "Username harus menggunakan huruf kecil")
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

export const validationCreateThread = Yup.object().shape({
  title: Yup.string().required("Judul thread diperlukan"),
  description: Yup.string().required("Deskripsi thread diperlukan"),
  tag: Yup.string().required("Tag diperlukan"),
  file: Yup.array().of(
    Yup.mixed().test("fileSize", "Ukuran file terlalu besar", (file) => {
      if (file) {
        return file.size <= 2 * 1024 * 1024; // 2MB max size
      }
      return true;
    }),
  ),
});
