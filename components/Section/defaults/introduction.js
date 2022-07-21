import { getMultiSectionDefaultFieldsString } from "../utils";
import { sectionsTrigger } from "../autocomplete";

const key = "introduction";

// fill in with default
const getName = () => {
  return "Your Name Here";
}

const fields = [
  {
    style: "center inline large-header",
    // title: "Sans Undertale",
    other: ["sansundertale@gmail.com", "sansundertale.com", "111-222-3333"],
  },
];

const getDefaultFields = () => getMultiSectionDefaultFieldsString(fields);

export const getIntroduction = () => {
    return {
        name: key,
        char: `${sectionsTrigger}${key}\n${getDefaultFields()}`,
        display: {
            title: getName(),
            description: "Don't forget your name & contact info!",
        },
    }
}
