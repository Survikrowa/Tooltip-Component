import { renderTooltip } from "./renderTooltip";

const colorPanel = document.querySelector('[data-role="color-panel"]');
const objectWrapper = document.querySelector(".object__wrapper");
const htmlObjects = objectWrapper.querySelectorAll(".object");
const positionPanel = document.querySelector('[data-role="position-panel"]');
const textPanel = document.querySelector('[data-role="text-panel"]');

const getObjectsContainer = () => {
  return document.querySelectorAll(".object__container");
};

const getColor = () => {
  return colorPanel.querySelector('input[name="color-pick"]:checked').value;
};

const getPosition = () => {
  return positionPanel.querySelector('input[name="position-pick"]:checked')
    .value;
};

const getTooltipText = () => {
  return textPanel.querySelector('[data-role="tooltip-input"]').value;
};

const getTooltip = () => {
  return objectWrapper.querySelector(".tooltip");
};

const deleteTooltip = () => {
  const objectsContainer = getObjectsContainer();
  objectsContainer.forEach(objectContainer => {
    const tooltip = getTooltip();
    if (tooltip) {
      tooltip.remove();
    }
  });
};

const tooltipColor = getColor();
const tooltipPosition = getPosition();
const tooltipText = getTooltipText();

const tooltipOptions = {
  color: tooltipColor,
  position: tooltipPosition,
  text: tooltipText
};

let { color, position, text } = tooltipOptions;

console.log(color, position, text);
colorPanel.addEventListener("change", () => {
  color = getColor();
  tooltipHandler(htmlObject, color, position, text);
});
positionPanel.addEventListener("change", () => {
  position = getPosition();
});
textPanel.addEventListener("change", () => {
  text = getTooltipText();
});

const tooltipHandler = (element, color, position, text) => {
  deleteTooltip();
  element.insertAdjacentHTML(
    "afterbegin",
    renderTooltip(color, position, text)
  );
};

htmlObjects.forEach(htmlObject => {
  htmlObject.addEventListener("click", () => {
    tooltipHandler(htmlObject, color, position, text);
  });
});
