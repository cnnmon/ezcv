import { getMultiSectionDefaultFieldsString } from "./utils";

const key = "experience"

const fields = [
  {
    title: "Incoming Clown in Residence",
    subtitle: "The Circus of America",
    date: "May 2022 - Present",
    description: "Washington D.C.",
    other: ["Clown infra team"],
  },
  {
    title: "Clown in Residence",
    subtitle: "The Circus of Canada",
    date: "May 2020 - Aug 2020",
    description: "Toronto",
    other: ["Did clown stuff", "Did more clown stuff"],
  },
]

const getDefaultFields = () => getMultiSectionDefaultFieldsString(fields);

export const getExperience = () => {
    return {
        name: key,
        char: `/${key}\n${getDefaultFields()}`,
        display: {
            title: "Experience",
            description: "Brag about your past work & volunteer experiences.",
        },
    }
}
