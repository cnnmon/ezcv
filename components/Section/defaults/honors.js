import { getMultiSectionDefaultFieldsString } from "../utils";
import { sectionsTrigger } from "../../constants";

const key = "honors";

const fields = [
  {
    title: "Most cucked",
    subtitle: "Ethan Nankervis",
    date: "July 2021",
    other: [],
  },
  {
    title: "Abortion date",
    subtitle: "parents",
    date: "July 2002",
    other: [],
  },
];

const getDefaultFields = () => getMultiSectionDefaultFieldsString(fields);

const getHonors = () => ({
  name: key,
  char: `${sectionsTrigger}${key}\n${getDefaultFields()}`,
  display: {
    title: "Honors",
    description: "Brag about your past awards and honors.",
  },
});

export default getHonors;
