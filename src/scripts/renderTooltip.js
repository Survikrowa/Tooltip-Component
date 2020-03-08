export const renderTooltip = (color, position, text, textColor) => {
  return `<div class="tooltip ${color} ${position}">
        <span style="color: ${textColor};">${text}</span>
    </div>`;
};
