.// ==UserScript==
// @name        *_FirstResponder_1_*F*
// @namespace   https://www.meldkamerspel.com/profile/214761
// @version     1.1.2
// @author      Rene-MKS (Oorspronkelijk DE uitvoering BOS-Ernie)
// @description Selecteert het dichtstbijzijnde hulpvoertuig
// @match       https://*.meldkamerspel.com/missions/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=meldkamerspel.com
// @run-at      document-idle
// @grant       none
// @updateURL   https://github.com/Rene-63/FirstResponder-NL/blob/main/*_FirstResponder_1_*F*.user.js
// @downloadURL https://github.com/Rene-63/FirstResponder-NL/blob/main/*_FirstResponder_1_*F*.user.js
// @resource
// ==/UserScript==

(function () {
  /**
* Lijst met voertuigtypen die kunnen worden geselecteerd als hulpverleners.
   *
   * Geef commentaar of verwijder voertuigen die niet bedoeld zijn om te worden gebruikt.
   *
   *  @type {number[]}
   */
  const firstResponderVehicleTypeIds = [

20, // DA
21, // DB-K

  ];

  function addSelectButton() {
    const icon = document.createElement("span");
    icon.classList.add("glyphicon", "glyphicon-pencil");

    const firstResponderButton = document.createElement("button");
    firstResponderButton.classList.add("btn", "btn-primary");
    firstResponderButton.appendChild(icon);
    firstResponderButton.addEventListener("click", clickEventHandler);
    firstResponderButton.title = "FirstReponder alarmeren (Toets: f)";

    const wrapper = document.createElement("div");
    wrapper.classList.add("flex-row", "flex-nowrap");
    wrapper.appendChild(firstResponderButton);

    const iframeBottomContent = document.querySelector("#iframe-bottom-content");
    if (iframeBottomContent === null) {
      return;
    }

    let parent = iframeBottomContent.querySelector("#mission_alliance_share_btn");
    if (parent === null) {
      parent = iframeBottomContent.querySelector("#mission_next_mission_btn");
    }

    parent.parentElement.after(wrapper);
  }

  function clickEventHandler(event) {
    event.preventDefault();
    selectFirstResponder();
  }

  async function selectFirstResponder() {
    const checkboxes = document.getElementsByClassName("vehicle_checkbox");

    let firstResponderFound = false;
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i];

      if (checkbox.disabled) {
        continue;
      }

      if (checkbox.checked) {
        continue;
      }

      const vehicleTypeId = parseInt(checkbox.getAttribute("vehicle_type_id"));
      if (firstResponderVehicleTypeIds.includes(vehicleTypeId)) {
        checkbox.click();
        firstResponderFound = true;

        break;
      }
    }

    if (!firstResponderFound) {
      alert(
        "[FirstResponder] Geen geschikt voertuig gevonden. Herlaad voertuigen of breid de toegestane voertuigtypen uit.",
      );
    }
  }

  function main() {
    addSelectButton();

    document.addEventListener("keydown", function (event) {
      if (event.key === "f") {
        selectFirstResponder();
      }
    });
  }

  main();
})();
