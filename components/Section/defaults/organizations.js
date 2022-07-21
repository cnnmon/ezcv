import { getMultiSectionDefaultFieldsString } from "../utils";
import { sectionsTrigger } from "../autocomplete";

const key = "organizations"

const fields = [
  {
    title: "Cucked co.",
    subtitle: "University of Clown, Cincinnati",
    date: "Aug 2020 - Present",
    other: [],
  },
  {
    title: "Blueprint",
    subtitle: "University of Clown, Cincinnati",
    date: "July 2021 - Present",
    other: [],
  },
];

const getDefaultFields = () => getMultiSectionDefaultFieldsString(fields);

export const getOrganizations = () => {
    return {
        name: key,
        char: `${sectionsTrigger}${key}\n${getDefaultFields()}`,
        display: {
            title: "Organizations",
            description: "Brag about your affiliations.",
        },
    }
}
