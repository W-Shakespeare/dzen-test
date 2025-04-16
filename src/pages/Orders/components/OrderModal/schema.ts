import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required("Название обязательно"),
  date: yup.date().required("Дата обязательна"),
});
