import domToImage from "dom-to-image";

export const exportWidget = (title) => {
  const input = document.getElementById(`print-${title}`);

  domToImage
    .toPng(input, {
      quality: 2,
      filter: (node) => node.tagName !== "BUTTON",
    })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${title.replace(" ", "-")}.png`;
      link.href = dataUrl;
      link.click();
    });
};
