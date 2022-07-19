import { getMultiSectionDefaultFieldsString } from "./utils";

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
        char: `/${key}\n${getDefaultFields()}`,
        display: {
            title: "Skills",
            description: "Brag about your best skills and tools.",
        },
    }
}
