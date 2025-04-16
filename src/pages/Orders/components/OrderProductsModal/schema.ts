import * as yup from "yup";

export const schema = yup.object().shape({
  serialNumber: yup.string().required("Serial Number обязателен"),
  isNew: yup.boolean().required(),
  photo: yup.mixed().required("Фото обязательно"),
  title: yup.string().required("Название обязательно"),
  type: yup.string().required("Тип обязателен"),
  specification: yup.string().required("Спецификация обязательна"),
  guaranteeStart: yup.date().required("Дата начала гарантии обязательна"),
  guaranteeEnd: yup.date().required("Дата окончания гарантии обязательна"),
  priceUsd: yup.string().required("Цена в USD обязательна"),
  priceUah: yup.string().required("Цена в UAH обязательна"),
});
