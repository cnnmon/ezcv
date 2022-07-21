import { getMultiSectionDefaultFieldsString } from "../utils";
import { sectionsTrigger } from "../autocomplete";

const key = "skills"

const fields = [
  {
    style: "inline",
    other: ["Python", "C#"],
  },
]

const getDefaultFields = () => getMultiSectionDefaultFieldsString(fields);

export const getSkills = () => {
    return {
        name: key,
        char: `${sectionsTrigger}${key}\n${getDefaultFields()}`,
        display: {
            title: "Skills",
            description: "Brag about your best skills and tools.",
        },
    }
}
