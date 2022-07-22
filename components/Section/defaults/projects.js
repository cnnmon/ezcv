import { getMultiSectionDefaultFieldsString } from "../utils";
import { sectionsTrigger } from "../../constants";

const key = "projects";

const fields = [
  {
    title: "CuckCoin",
    date: "July 2022",
    other: ["web4 project. :)"],
  },
  {
    title: "Facebook",
    date: "March - July 2002",
    other: ["small startup, you've probably never heard of it"],
  },
];

const getDefaultFields = () => getMultiSectionDefaultFieldsString(fields);

const getProjects = () => ({
  name: key,
  char: `${sectionsTrigger}${key}\n${getDefaultFields()}`,
  display: {
    title: "Projects",
    description: "Brag about your past projects.",
  },
});

export default getProjects;
