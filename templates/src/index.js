import <%= packageNamePC %> from "./<%= packageNamePC %>";
if (window.customElements) {
  customElements.define("<%= packageName %>", <%= packageNamePC %>);
}
export default <%= packageNamePC %>;