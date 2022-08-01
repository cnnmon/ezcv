import { COLORS } from "./colors";
import { getEmptySubsection, getEmptySection, getSections } from "./sections";
import { getFields } from "./fields";
import { isValidStyling, getDefaultStyling, getStyling } from "./styling";

// globally used trigger
export const trigger = "*";
export const stylingTrigger = "@";

// mobile breakpoint
// TODO: modify
export const mobileBreakpoint = "0px";

// default states
export const getDefaultText = () => `${getSections()[0].char}\n`;

export { COLORS, isValidStyling, getDefaultStyling, getStyling, getEmptySubsection, getEmptySection, getSections, getFields };
