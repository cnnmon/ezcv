import { getDefaultEducationFields } from "../components/Resume/education";

const phrases = {
  "/": [
    {
      name: "education",
      description: "A block to talk about your school, classes, GPA.",
      char: `/education\n${getDefaultEducationFields()}`,
    },
    {
      name: "experience",
      description:
        "A block to talk about your previous jobs, volunteering, etc.",
      char: "/experience",
    },
  ],
};

export default phrases;
