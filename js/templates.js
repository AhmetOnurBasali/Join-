async function includeHTML() {
    let includeElements = document.querySelectorAll("[w3-include-html]");
    for (let i = 0; i < includeElements.length; i++) {
      const element = includeElements[i];
      file = element.getAttribute("w3-include-html"); // "includes/header.html"
      let resp = await fetch(file);
      if (resp.ok) {
        element.innerHTML = await resp.text();
      } else {
        element.innerHTML = "Page not found";
      }
    }
  }

  async function initTemplate() {
    await includeHTML();
    document.getElementById("headline").innerHTML = headerHTML()
    document.getElementById("sidebar").innerHTML = sidebarHTML()
    document.getElementById("addTask").innerHTML = addTaskHTML()
  }

  function headerHTML() {
    return `

    `

  }

  function sidebarHTML() {
    return `

    `

  }


  function addTaskHTML() {
    return``
  }