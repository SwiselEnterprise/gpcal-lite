import { elements } from "./base.js";
import { add2gpArr, getGpa, removeGpa, updateGpa } from "./calcGp.js";

const sectionSwitch = () => {
  elements.addBtn.style.display = "none"
  elements.modePop.style.display = "none";
  elements.savePopup.style.display = "none";
  elements.updatePopup.style.display = "none";
  elements.noGpView.style.display = "none";
  elements.calcAreaUni.style.display = "none";
  elements.calcAreaUni.dataset.shown = 'no';
  elements.calcAreaPoly.style.display = "none";
  elements.calcAreaPoly.dataset.shown = 'no';
  elements.showSavedGp.style.display = "none";
  elements.editAreaUni.style.display = "none";
  elements.editAreaUni.dataset.shown = 'no';
  elements.editAreaPoly.style.display = "none";
  elements.editAreaPoly.dataset.shown = 'no';
  elements.aboutSec.style.display = "none";
}

const addSavedGpField = (gpa) => {
  const showGpFieldHtml = `
  <li>
    <span class="gp-name">${gpa.name.toUpperCase()}</span>
    <input type="hidden" id="gpaId" value="${gpa.id}">
    <span class="gpa">${gpa.gpa}</span>
    <button class="edit-gpa">edit</button>
    <button class="remove-gpa">remove</button>
  </li>
  `;
  elements.gpShowUl.insertAdjacentHTML('beforeend', showGpFieldHtml);
}

const addEditGpFieldUni = (gpResult) => {
  const gpEditFieldHtml = `
  <li>
    <input type="text" class="courseCode" value="${gpResult.cCode}">
    <input type="number" min="0" value="${gpResult.cCredUnit}" class="creditUnit">
    <select name="grade" class="grade">
      <option value="${gpResult.grade}">${gpResult.grade}</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
      <option value="E">E</option>
      <option value="F">F</option>
    </select>
    <button>remove</button>

  </li>
  `;
  elements.gpEditUlUni.insertAdjacentHTML('beforeend', gpEditFieldHtml);
}

const addEditGpFieldPoly = (gpResult) => {
  const gpEditFieldHtml = `
  <li>
    <input type="text" class="courseCode" value="${gpResult.cCode}">
    <input type="number" min="0" value="${gpResult.cCredUnit}" class="creditUnit">
    <select name="grade" class="grade">
      <option value="${gpResult.grade}">${gpResult.grade}</option>
      <option value="A">A</option>
      <option value="AB">AB</option>
      <option value="B">B</option>
      <option value="BC">BC</option>
      <option value="C">C</option>
      <option value="CD">CD</option>
      <option value="D">D</option>
      <option value="P">P</option>
      <option value="F3">F3</option>
      <option value="F2">F2</option>
      <option value="F0">F0</option>
    </select>
    <button>remove</button>
  </li>
  `;
  elements.gpEditUlPoly.insertAdjacentHTML('beforeend', gpEditFieldHtml);
}

export const createGpFieldUni = () => {
  return `
    <li>
      <input type="text" placeholder="Course Code" class="courseCode">
      <input type="number" min="0" placeholder="Credit Unit" class="creditUnit">
      <select name="grade" class="grade">
        <option value="-1">Grade</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
      </select>
      <button>remove</button>
    </li>
  `;
}

export const createGpFieldPoly = () => {
  return `
    <li>
      <input type="text" placeholder="Course Code" class="courseCode">
      <input type="number" min="0" placeholder="Credit Unit" class="creditUnit">
      <select name="grade" class="grade">
        <option value="-1">Grade</option>
        <option value="A">A</option>
        <option value="AB">AB</option>
        <option value="B">B</option>
        <option value="BC">BC</option>
        <option value="C">C</option>
        <option value="CD">CD</option>
        <option value="D">D</option>
        <option value="P">P</option>
        <option value="F3">F3</option>
        <option value="F2">F2</option>
        <option value="F0">F0</option>
      </select>
      <button>remove</button>
    </li>
  `;
}

export const addGpField = (mode) => {
  if (elements.calcAreaUni.dataset.shown == 'yes' || elements.calcAreaPoly.dataset.shown == 'yes') {
    if (mode === "university") {
      elements.gpCalcUl.insertAdjacentHTML('beforeend', createGpFieldUni());
      let h = elements.gpCalcUl.clientHeight;
      window.scrollTo({
        top: h,
        behavior: 'smooth'
      })
    }else if(mode === "polytechnic"){
      elements.gpCalcUlPoly.insertAdjacentHTML('beforeend', createGpFieldPoly());
      let h = elements.gpCalcUlPoly.clientHeight;
      window.scrollTo({
        top: h,
        behavior: 'smooth'
      })
    }
  }else if (elements.editAreaUni.dataset.shown == 'yes' || elements.editAreaPoly.dataset.shown == 'yes'){
    if (elements.gpDisplayMode.value === "university") {
      elements.gpEditUlUni.insertAdjacentHTML('beforeend', createGpFieldUni());
      let h = elements.gpEditUlUni.clientHeight;
      window.scrollTo({
        top: h,
        behavior: 'smooth'
      })
    }else if(elements.gpDisplayMode.value === "polytechnic"){
      elements.gpEditUlPoly.insertAdjacentHTML('beforeend', createGpFieldPoly());
      let h = elements.gpEditUlPoly.clientHeight;
      window.scrollTo({
        top: h,
        behavior: 'smooth'
      })
    }
  }

}

export const removeGpaField = (parent, child, gpaId) => {
  parent.removeChild(child);
  removeGpa(gpaId);
}

export const showCalcArea = (mode) => {
  sectionSwitch();
  elements.gpDisplayP.innerHTML = "My Gp is"
  elements.gpDisplay.style.display = "block";
  elements.addBtn.style.display = "block"
  elements.gpDisplay.innerHTML = "0.00";
  if (mode === "university") {
    elements.calcAreaUni.dataset.shown = 'yes';
    elements.calcAreaUni.style.display = 'block';
  }else if(mode === "polytechnic"){
    elements.calcAreaPoly.dataset.shown = 'yes';
    elements.calcAreaPoly.style.display = 'block';
  }

}

export const showModePop = () => {
  elements.modePop.style.display = "block";
  elements.gpNameInput.focus();
}

export const showSavePop = () => {
  elements.savePopup.style.display = 'block';
  elements.gpNameInput.focus();
}

export const showUpdatePop = () => {
  elements.updatePopup.style.display = "block";
  elements.gpEditNameInput.value = elements.gpDisplayP.innerHTML;
  elements.gpEditNameInput.focus();
}

export const showSavedGp = () => {
  sectionSwitch();
  elements.showSavedGp.style.display = "block";
  elements.gpShowUl.innerHTML = "";
  elements.canvas.classList.remove('open');
  removePopCanvasEffect();
  elements.gpDisplay.style.display = "none";
  elements.gpDisplayP.innerHTML = "My GPAs";
  if (getGpa().length > 0) {
    getGpa().forEach(gpa => {
      addSavedGpField(gpa);
    });
  }else{
    let p = `
    <p style="text-align: center">No GPA saved yet!</p>
    `;
    elements.gpShowUl.insertAdjacentHTML('beforeend', p);
  }

}

export const showEditGp = (gpaId) => {
  sectionSwitch();
  let gpaInfo = getGpa().find(gpa => gpa.id === gpaId);
  if (gpaInfo) {
    elements.gpDisplayP.innerHTML = gpaInfo.name;
    elements.gpDisplayInput.value = gpaInfo.id;
    elements.gpDisplayMode.value = gpaInfo.mode;
    elements.gpDisplay.innerHTML = gpaInfo.gpa;
    elements.gpDisplay.style.display = "block";
    if (gpaInfo.mode === "university") {
      elements.editAreaUni.dataset.shown = 'yes';
      elements.editAreaUni.style.display = 'block';
      elements.gpEditUlUni.innerHTML = "";
      if (gpaInfo.results.length > 0) {
        elements.addBtn.style.display = "block"
        gpaInfo.results.forEach(gpResult => {
          addEditGpFieldUni(gpResult);
        })
      }
    }else if (gpaInfo.mode === "polytechnic") {
      elements.editAreaPoly.dataset.shown = 'yes';
      elements.editAreaPoly.style.display = 'block';
      elements.gpEditUlPoly.innerHTML = "";
      if (gpaInfo.results.length > 0) {
        gpaInfo.results.forEach(gpResult => {
          addEditGpFieldPoly(gpResult);
        })
      }
    }
  }
}

export const showAbout = () => {
  sectionSwitch();
  elements.aboutSec.style.display = "block";
  elements.gpDisplayP.innerHTML = `<img src="./images/Logo.svg" width="50" height="50">`;
  elements.gpDisplay.innerHTML = 'GCal';
  elements.gpDisplay.style.display = "block";
  elements.canvas.classList.remove('open');
  removePopCanvasEffect();
}

export const saveGp = (gpObj) => {
  elements.savePopup.style.display = 'none';
  removePopCanvasEffect();
  add2gpArr(gpObj);
  elements.gpNameInput.value = "";
  elements.notify.style.display = "block";
  elements.notify.innerHTML = "Saved!";
  document.querySelectorAll('#calcAreaUni input, #calcAreaPoly input').forEach(input => {
    input.value = "";
  })
  setTimeout(() => {
    elements.notify.innerHTML = "";
  }, 2000);
}

export const searchGp = (searchText) => {
  elements.gpShowUl.innerHTML = "";
  if (typeof searchText === "string") {
    let filterGp =  getGpa().filter((gpa) => gpa.name.toLowerCase().includes(searchText.toLowerCase()));
    filterGp.forEach(gpa => {
      addSavedGpField(gpa)
    });
  }
}

export const updateGp = (updateObj) => {
  updateGpa(updateObj);
  elements.updatePopup.style.display = "none";
  showSavedGp();
  elements.canvas.classList.remove('open');
  removePopCanvasEffect();
}

export const trapFocus = (e, popup, focusList) => {
  let firstFocus = focusList[0];
  let lastFocus = focusList[focusList.length - 1];
  if (e.which === 27) {
    lastFocus.focus();
    popup.style.display = "none";
    removePopCanvasEffect();
  }else if (e.which === 9 && e.shiftKey) {
    if (e.target === firstFocus) {
      lastFocus.focus();
      e.preventDefault();
    }
  }else  if (e.which === 9) {
    if (e.target === lastFocus) {
      firstFocus.focus();
      e.preventDefault();
    }
  }
}

export const createPopCanvasEffect = () => {
  elements.overlay.style.display = 'block';
}

export const removePopCanvasEffect = () => {
  elements.overlay.style.display = 'none';
}
