import { getIntroduction } from "./defaults/introduction";
import { getEducation } from "./defaults/education";
import { getExperience } from "./defaults/experience";
import { getProjects } from "./defaults/projects";
import { getHonors } from "./defaults/honors";
import { getOrganizations } from "./defaults/organizations";
import { getSkills } from "./defaults/skills";
import { getTodaysDate } from "./utils";

// globally used triggers
export const sectionsTrigger = "@";
export const fieldsTrigger = "#";
export const styleTrigger = "*";

// Autocomplete uses name, char, display; Rendering (Resume) uses settings
export const getSections = () => {
  return (
    [
      getIntroduction(),
      getEducation(),
      getExperience(),
      getProjects(),
      getHonors(),
      getOrganizations(),
      getSkills(),
    ]
  )
};

export const getFields = () => {
  return (
    [
      {
        name: "title",
        char: `${fieldsTrigger}title title`,
        display: {
            title: "Title",
            description: "Define the title to a new subsection.",
        }
      },
      {
        name: "subtitle",
        char: `${fieldsTrigger}subtitle subtitle`,
        display: {
            title: "Subtitle",
            description: "Define the subtitle to the very last title.",
        }
      },
      {
        name: "date",
        char: `${fieldsTrigger}date ${getTodaysDate()}`,
        display: {
            title: "Subtitle",
            description: "Define the subtitle to a new subsection.",
        }
      },
    ]
  )
}
