import { renderTooltip } from "./renderTooltip";
import debounce from "lodash/debounce";

const DEFAULT_TOOLTIP_POSITION = "bottom";
const DEFAULT_TOOLTIP_COLOR = "primary";
const DEFAULT_TOOLTIP_TEXT_COLOR = "#FFFFFF";

const hexColorValidationRegEx = /^#([0-9A-F]{3}){1,2}$/i;

const colorPanel = document.querySelector(".color-panel");
const objectWrapper = document.querySelector(".object__wrapper");
const positionPanel = document.querySelector(".position-panel");
const textPanel = document.querySelector(".text-panel");
const objects = objectWrapper.querySelectorAll(".object");
let objectsArray = Array.from(objects);

const tooltipOptions = {
  color: DEFAULT_TOOLTIP_COLOR,
  position: DEFAULT_TOOLTIP_POSITION,
  text: "",
  textColor: DEFAULT_TOOLTIP_TEXT_COLOR
};

const getColor = () => {
  return colorPanel.querySelector('input[name="color-pick"]:checked').value;
};

const getPosition = () => {
  return positionPanel.querySelector('input[name="position-pick"]:checked')
    .value;
};

const getTooltipTextInputValue = () => {
  return textPanel.querySelector('[data-role="tooltip-input"]').value;
};

const getTooltipTextColor = () => {
  return textPanel.querySelector('[data-role="tooltip-text-color"]').value;
};

const getTooltipTextLength = () => {
  return textPanel.querySelector('[data-role="tooltip-input"]').value.length;
};

const getTooltip = () => {
  return objectWrapper.querySelector(".tooltip");
};

const deleteTooltip = element => {
  if (element) {
    element.remove();
  }
};

const isProperTextColor = textColor => {
  return hexColorValidationRegEx.test(textColor);
};

const getMaxTextLength = () => {
  return textPanel.querySelector('[data-role="text-length"]').value;
};

const checkTextLength = tooltipTextInput => {
  const maxTextLength = getMaxTextLength();
  const tooltipTextLength = getTooltipTextLength();
  if (tooltipTextLength > maxTextLength) {
    return tooltipTextInput.slice(0, maxTextLength);
  } else {
    return tooltipTextInput;
  }
};

let { color, position, text, textColor } = tooltipOptions;

let currentElement = 0;

const tooltipHandler = (element, color, position, text, textColor) => {
  const tooltip = getTooltip();
  if (isProperTextColor(textColor)) {
    element.insertAdjacentHTML(
      "beforebegin",
      renderTooltip(color, position, text, textColor)
    );
    deleteTooltip(tooltip);
  } else {
    element.insertAdjacentHTML(
      "beforebegin",
      renderTooltip(color, position, text, DEFAULT_TOOLTIP_TEXT_COLOR)
    );
    deleteTooltip(tooltip);
  }
};

const getCurrentElementInArray = () => {
  return objectsArray[currentElement];
};

objectWrapper.addEventListener("click", e => {
  if (e.target.parentNode.classList.contains("object__container")) {
    currentElement = objectsArray.indexOf(e.target);
    tooltipHandler(
      getCurrentElementInArray(),
      color,
      position,
      text,
      getTooltipTextColor()
    );
  }
});

colorPanel.addEventListener("change", () => {
  color = getColor();
  tooltipHandler(getCurrentElementInArray(), color, position, text, textColor);
});
positionPanel.addEventListener("change", () => {
  position = getPosition();
  tooltipHandler(getCurrentElementInArray(), color, position, text, textColor);
});
textPanel.addEventListener(
  "input",
  debounce(() => {
    const tooltipInputValue = getTooltipTextInputValue();
    text = checkTextLength(tooltipInputValue);
    tooltipHandler(
      getCurrentElementInArray(),
      color,
      position,
      text,
      getTooltipTextColor()
    );
  }, 1000)
);
