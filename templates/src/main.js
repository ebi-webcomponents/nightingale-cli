class <%= packageNamePC %> extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = "Hello World.";
    }
  }
  
  export default <%= packageName %>;