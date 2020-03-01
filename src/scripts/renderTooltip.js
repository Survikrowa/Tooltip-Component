export const renderTooltip = (color, position, text) => {
  return `<div class="tooltip ${color} ${position}">
        <span>${text}</span>
    </div>`;
};
