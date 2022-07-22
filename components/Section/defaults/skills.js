import { getMultiSectionDefaultFieldsString } from "../utils";
import { sectionsTrigger } from "../../constants";

const key = "skills";

const fields = [
  {
    style: "inline",
    other: ["Python", "C#"],
  },
];

const getDefaultFields = () => getMultiSectionDefaultFieldsString(fields);

const getSkills = () => ({
  name: key,
  char: `${sectionsTrigger}${key}\n${getDefaultFields()}`,
  display: {
    title: "Skills",
    description: "Brag about your best skills and tools.",
  },
});

export default getSkills;
