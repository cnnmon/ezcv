import { getDefaultEducationFields } from "../Sections/education";

const phrases = {
  "/": [
    {
      name: "introduction",
      char: "/introduction",
      display: {
        title: "Introduction",
        description: "Don't forget your name & contact info!",
      },
    },
    {
      name: "education",
      char: `/education\n${getDefaultEducationFields()}`,
      display: {
        title: "Education",
        description: "Brag about your degree (if any).",
      },
    },
    {
      name: "experience",
      char: "/experience",
      display: {
        title: "Experience",
        description: "Brag about your past work & volunteer experiences.",
      },
    },
  ],
};

export default phrases;
