// ==UserScript==
// @name        *_FirstResponder_#2-(DA,_NH_en_TS)-*G*
// @namespace   https://www.meldkamerspel.com/profile/214761
// @version     1.1.0
// @author      Rene-MKS (Oorspronkelijk DE uitvoering BOS-Ernie)
// @description Selecteert het dichtstbijzijnde hulpvoertuig
// @match       https://*.meldkamerspel.com/missions/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=meldkamerspel.com
// @run-at      document-idle
// @grant       none
// @updateURL   https://github.com/Rene-63/FirstResponder-NL/raw/main/*_FirstResponder_%232-(DA%2C_NH_en_TS)-*G*.user.js
// @downloadURL https://github.com/Rene-63/FirstResponder-NL/raw/main/*_FirstResponder_%232-(DA%2C_NH_en_TS)-*G*.user.js
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
0, // SI‐2
1, // TS 8/9
6, // TST 8/9
7, // TST 6/7
8, // TST 4/5
9, // TS 4/5
12, // TST-NB 8/9
14, // TST-NB 6/7
15, // TST-NB 4/5
17, // TS 6/7
20, // DA
21, // DB-K
22, // DA Noodhulp
25, // DB Noodhulp
46, // DM Noodhulp
60, // DB-Bike

  ];

  function addSelectButton() {
    const icon = document.createElement("span");
    icon.classList.add("glyphicon", "ok-circle");

    const firstResponderButton = document.createElement("button");
    firstResponderButton.classList.add("btn", "btn-primary");
    firstResponderButton.appendChild(icon);
    firstResponderButton.addEventListener("click", clickEventHandler);
    firstResponderButton.title = "FirstReponder alarmeren (Toets: G)";

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
      if (event.key === "G") {
        selectFirstResponder();
      }
    });
  }

  main();
})();
