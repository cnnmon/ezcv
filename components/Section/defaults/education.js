import { getMultiSectionDefaultFieldsString } from "../utils";
import { sectionsTrigger } from "../autocomplete";

const key = "education"

const fields = [
  {
    style: "non-bulleted",
    title: "B.A. Clown Science",
    subtitle: "University of Clown, Cincinnati",
    date: "Aug 1555 - May 2020",
    other: ["GPA: 0.0", "Coursework: Clown Car Driving"],
  }
];

const getDefaultFields = () => getMultiSectionDefaultFieldsString(fields);

export const getEducation = () => {
    return {
        name: key,
        char: `${sectionsTrigger}${key}\n${getDefaultFields()}`,
        display: {
            title: "Education",
            description: "Brag about your degree (if any).",
        },
    }
}
