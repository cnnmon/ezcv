import { getSectionsFormat, getFieldsFormat } from "./utils";
import { BsFillFilePersonFill } from "react-icons/bs";

// globally used triggers
export const sectionsTrigger = "@";
export const fieldsTrigger = "#";
export const styleTrigger = "*";

// Autocomplete uses name, char, display; Rendering (Resume) uses settings
export const getSections = () => [
  getSectionsFormat("Name",
    [
      {
        style: "center inline large-header",
        other: ["firstlast@gmail.com", "yourwebsite.com", "(111)-222-3333"],
      },
    ],
    { "image": BsFillFilePersonFill },
  ),
  getSectionsFormat("Education",
    [
      {
        title: "B.A. Celtic Studies",
        subtitle: "University of California, Berkeley",
        date: "Aug 2016 - Expected May 2020",
        other: ["GPA: 3.6/4.0", "Relevant Coursework: Irish Literature, Celtic Mythology, Comparative and Historical Linguistics, Scandinavian Folklore"],
      },
    ],
    { "image": BsFillFilePersonFill },
  ),
  getSectionsFormat("Experience",
    [
      {
        title: "Incoming Clown in Residence",
        subtitle: "The Circus of America",
        date: "May 2022 - Present",
        description: "Washington D.C.",
        other: ["- Clown infra team"],
      },
      {
        title: "Clown in Residence",
        subtitle: "The Circus of Canada",
        date: "May 2020 - Aug 2020",
        description: "Toronto",
        other: ["- Did clown stuff", "- Did more clown stuff"],
      },
    ],
    { "image": BsFillFilePersonFill },
  ),
  getSectionsFormat("Projects",
    [
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
    ],
    { "image": BsFillFilePersonFill },
  ),
  getSectionsFormat("Honors",
    [
      {
        title: "Most cucked",
        subtitle: "Ethan Nankervis",
        date: "July 2021",
        other: [],
      },
      {
        title: "Birth date",
        subtitle: "parents",
        date: "July 2002",
        other: [],
      },
    ],
    { "image": BsFillFilePersonFill },
  ),
  getSectionsFormat("Organizations",
    [
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
    ],
    { "image": BsFillFilePersonFill },
  ),
  getSectionsFormat("Skills",
    [
      {
        style: "inline",
        other: ["Python", "C#"],
      },
    ],
    { "image": BsFillFilePersonFill },
  ),
];

export const getFields = () => [
  getFieldsFormat("title", {
      title: "Title",
      description: "Title a new subsection.",
  }),
  getFieldsFormat("subtitle", {
      title: "Subtitle",
      description: "Define the subtitle to the very last title."
  }),
  getFieldsFormat("date", {
      title: "Date",
      description: "Define the subtitle to a new subsection."
  }),
  getFieldsFormat("description", {
      title: "Description",
      description: "Define the description to a new subsection."
  }),
];

// empty fields
export const getEmptyFields = () => {
  return {
    style: "",
    title: "",
    subtitle: "",
    description: "",
    date: "",
    other: [],
  };
}
