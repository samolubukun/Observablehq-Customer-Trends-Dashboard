import {html} from "npm:htl";

export function bigNumber(metric, dateArray, value, compare, width) {
  const showDate = Array.isArray(dateArray) && dateArray[0] && dateArray[1];
  return html`
    <h2>${metric}</h2>
    <div style="font-size: ${width / 250}rem">
      ${showDate ? html`<h3><i>${dateArray[0]} to ${dateArray[1]}</i></h3>` : ""}
      <h1>${value}</h1>
      <div>${compare}</div>
    </div>
  `;
}
