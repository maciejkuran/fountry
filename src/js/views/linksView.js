class LinksView {
  createMarkup(sourceLinks) {
    const linksContainer = document.querySelector('.links-container .links');

    sourceLinks.forEach((link, i) => {
      const a = document.createElement('a');
      a.setAttribute('target', '_blank');
      a.href = link;
      a.textContent = `${i + 1}) ${link}`;
      linksContainer.append(a);
    });
  }
}

export default new LinksView();
