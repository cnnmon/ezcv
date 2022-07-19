import { getMultiSectionDefaultFieldsString } from "./utils";

const key = "introduction";

const fields = [
  {
    style: "center inline title-as-header large-header",
    title: "Sans Undertale",
    other: ["sansundertale@gmail.com", "sansundertale.com", "111-222-3333"],
  },
];

const getDefaultFields = () => getMultiSectionDefaultFieldsString(fields);

export const getIntroduction = () => {
    return {
        name: key,
        char: `/${key}\n${getDefaultFields()}`,
        display: {
            title: "Introduction",
            description: "Don't forget your name & contact info!",
        },
    }
}
