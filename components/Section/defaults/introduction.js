import { getMultiSectionDefaultFieldsString } from "../utils";
import { sectionsTrigger } from "../../constants";

// fill in with default
const getName = () => "Name";

const fields = [
  {
    style: "center inline large-header",
    // title: "Sans Undertale",
    other: ["sansundertale@gmail.com", "sansundertale.com", "111-222-3333"],
  },
];

const getDefaultFields = () => getMultiSectionDefaultFieldsString(fields);

const getIntroduction = () => ({
  name: "your name here",
  char: `${sectionsTrigger}${getName()}\n${getDefaultFields()}`,
  display: {
    title: getName(),
    description: "Don't forget your name & contact info!",
  },
});

export default getIntroduction;
