let uuidv4 = require('uuid/v4');
import { showCalcArea, addGpField, showSavePop, saveGp, removeGpaField, showSavedGp, searchGp, showEditGp, createGpFieldUni, createGpFieldPoly, showUpdatePop, updateGp, showModePop, showAbout, createPopCanvasEffect, removePopCanvasEffect, trapFocus } from "./models/display.js";
import { elements } from './models/base.js';
import { productCredUnitGrade, getGpa } from "./models/calcGp.js";

if(getGpa().length > 0) {;
  elements.noGpViewImg.src = "./images/savedGp.svg";
  elements.noGpViewP.innerHTML = "Some GPAs Calculated";
  elements.showCalcAreaBtn.innerHTML = "Calculate more GPAs";
}

const footerP = `
  <a class="copyright" href="https://swisel.co">&copy; Swisel Enterprise ${new Date().getFullYear()}</a>
`;
elements.canvasFooter.insertAdjacentHTML('beforeend', footerP);
elements.footerDiv.forEach(footDiv => {footDiv.insertAdjacentHTML('beforeend', footerP)});

const gpResults = [];
const gpResultsEdit = [];

const calcRenderGp = (lists) => {
  let gpTempArr = [];
  let creditSum = 0;
  let sum = 0;
  let gp = 0;
  lists.forEach(list => {
    let eachCUVal = Number(list.querySelector('.creditUnit').value);
    let eachCCVal = list.querySelector('.courseCode').value;
    let eachSelectVal = list.querySelector('select').value;
    if (eachCUVal !== "" && eachSelectVal !== "" && eachSelectVal !== "-1" && eachSelectVal !== -1) {
      creditSum += eachCUVal;
      sum += productCredUnitGrade(eachCUVal, eachSelectVal, elements.gpDisplayMode.value);
      gpTempArr.push({
        id: uuidv4(),
        cCode: eachCCVal,
        cCredUnit: eachCUVal,
        grade: eachSelectVal
      });
    }
  });
  gp = (sum === 0 || creditSum === 0) ? "0.00" : ((sum / creditSum).toFixed(2));

  elements.gpDisplay.innerHTML = gp;
  gpResults.push(gpTempArr);
}

const editCalcRenderGp = (lists) => {
  let gpEditTempArr = [];
  let creditSumEdit = 0;
  let sumEdit = 0;
  let gpEdit = 0;
  lists.forEach(list => {
    let eachCUVal = Number(list.querySelector('.creditUnit').value);
    let eachCCVal = list.querySelector('.courseCode').value;
    let eachSelectVal = list.querySelector('select').value;
    if (eachCUVal !== "" && eachSelectVal !== "" && eachSelectVal !== "-1") {
      creditSumEdit += eachCUVal;
      sumEdit += productCredUnitGrade(eachCUVal, eachSelectVal, elements.gpDisplayMode.value);
      gpEditTempArr.push({
        cCode: eachCCVal,
        cCredUnit: eachCUVal,
        grade: eachSelectVal
      });
    }
  });
  gpEdit = (sumEdit === 0 || creditSumEdit === 0) ? "0.00" : ((sumEdit / creditSumEdit).toFixed(2));

  elements.gpDisplay.innerHTML = gpEdit;
  gpResultsEdit.push(gpEditTempArr);
}

const popSaver = (e) => {
  e.preventDefault();
  let gpName = elements.gpNameInput.value.trim();
  let gpa = elements.gpDisplay.innerHTML;
  // trap focus in the popup
  if(gpName !== "" && gpName.length !== 0){
    if (elements.gpDisplay.innerHTML !== "0.00") {
      saveGp({
        name: gpName,
        gpa,
        mode: elements.gpDisplayMode.value,
        results: gpResults[gpResults.length - 1]
      });
    }else{
      elements.savePopupP.innerHTML = "GPA is 0.00";
    }
  }else{
    elements.savePopupP.innerHTML = "Name Field can't be empty!";
    elements.gpNameInput.focus();
  }
}

const popUpdater = (e) => {
  e.preventDefault();
  let gpEditName = elements.gpEditNameInput.value.trim();
  if (gpEditName !== "") {
    if (elements.gpDisplay.innerHTML !== "0.00") {
      if (gpResultsEdit.length > 0) {
        let results = gpResultsEdit[gpResultsEdit.length - 1];
        // trap focus in the popup
        updateGp({
          id: elements.gpDisplayInput.value,
          name: gpEditName,
          gpa: elements.gpDisplay.innerHTML,
          mode: elements.gpDisplayMode.value,
          results: results
        });
      }else{
        updateGp({
          id: elements.gpDisplayInput.value,
          name: gpEditName,
          gpa: elements.gpDisplay.innerHTML,
          mode: elements.gpDisplayMode.value
        });
      }
    }else{
      elements.updatePopupP.innerHTML = "GPA is 0.00";
    }
  }else{
    elements.updatePopupP.innerHTML = "Name Field can't be empty!";
    elements.gpEditNameInput.focus();
  }
}

elements.menu.forEach(icon => {
  icon.addEventListener('click', (e) => {
    elements.canvas.classList.toggle('open');
    createPopCanvasEffect();
    e.stopPropagation();
  });
});

elements.closeMenu.addEventListener('click', () => {
  removePopCanvasEffect();
})

elements.showCalcAreaBtn.addEventListener('click', () => {
  showModePop();
  createPopCanvasEffect();
})

elements.proceedBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let mode = e.target.parentElement.querySelector("input[name='mode']:checked");
  if (mode) {
    elements.gpDisplayMode.value = mode.value;
    removePopCanvasEffect();
    showCalcArea(mode.value);
  }
});

elements.showCalcArea.addEventListener('click', () => {
  showModePop();
  createPopCanvasEffect();
  elements.canvas.classList.toggle('open');
})


elements.addBtn.addEventListener('click', () => {
  addGpField(elements.gpDisplayMode.value);
});

['input', 'change'].forEach(evt => {
  elements.gpCalcUl.addEventListener(evt, (e) => {
    if (e.target.matches('.creditUnit') || e.target.matches('.courseCode') || e.target.matches('select')) {
      const li = e.target.parentNode.parentNode.querySelectorAll('li');
      calcRenderGp(li);
    }
  })
});

['input', 'change'].forEach(evt => {
  elements.gpCalcUlPoly.addEventListener(evt, (e) => {
    if (e.target.matches('.creditUnit') || e.target.matches('.courseCode') || e.target.matches('select')) {
      const li = e.target.parentNode.parentNode.querySelectorAll('li');
      calcRenderGp(li);
    }
  })
});

elements.gpCalcUl.addEventListener('click', (e) => { // deletes a removed gp
  if (e.target.matches('button')) {
    let child = e.target.parentNode;
    let parent = e.target.parentNode.parentNode;
    parent.removeChild(child);
    calcRenderGp(parent.querySelectorAll('li'));
  }
});

elements.gpCalcUlPoly.addEventListener('click', (e) => { // deletes a removed gp
  if (e.target.matches('button')) {
    let child = e.target.parentNode;
    let parent = e.target.parentNode.parentNode;
    parent.removeChild(child);
    calcRenderGp(parent.querySelectorAll('li'));
  }
});

elements.closePop.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    elements.savePopup.style.display = 'none';
    elements.updatePopup.style.display = 'none';
    elements.modePop.style.display = 'none';
    removePopCanvasEffect();
  });
});

elements.showSaveGpPopBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    showSavePop();
    createPopCanvasEffect();
  });
})

elements.gpNameInput.addEventListener('keypress', (e) => {
  if (e.charCode === 13) {
    popSaver(e);
  }
});

elements.saveGp.addEventListener('click', popSaver);

elements.showSavedGpBtn.addEventListener('click', () => { // shows the save popup
  elements.gpNameInput.focus();
  showSavedGp();

});

elements.searchInput.addEventListener('input', (e) => {
  let searchText = e.target.value.trim();
  searchGp(searchText);
});

elements.gpShowUl.addEventListener('click', (e) => { // deletes a removed gp
  if (e.target.matches('.remove-gpa')) {
    let child = e.target.parentNode;
    let parent = e.target.parentNode.parentNode;
    let gpaId = child.querySelector('input').value;
    removeGpaField(parent, child, gpaId);
  }
});

elements.gpShowUl.addEventListener('click', (e) => { // edits a saved gp
  if (e.target.matches('.edit-gpa')) {
    let gpaId = e.target.parentNode.querySelector('input').value;
    showEditGp(gpaId);
  }
});

['input', 'change'].forEach(evt => {
  elements.gpEditUlUni.addEventListener(evt, (e) => {
    if (e.target.matches('.creditUnit') || e.target.matches('.courseCode') || e.target.matches('select')) {
      const li = e.target.parentNode.parentNode.querySelectorAll('li');
      editCalcRenderGp(li);
    }
  })
});

['input', 'change'].forEach(evt => {
  elements.gpEditUlPoly.addEventListener(evt, (e) => {
    if (e.target.matches('.creditUnit') || e.target.matches('.courseCode') || e.target.matches('select')) {
      const li = e.target.parentNode.parentNode.querySelectorAll('li');
      editCalcRenderGp(li);
    }
  })
});

elements.gpEditUlUni.addEventListener('click', (e) => { // deletes a removed gp
  if (e.target.matches('button')) {
    let child = e.target.parentNode;
    let parent = e.target.parentNode.parentNode;
    parent.removeChild(child);
    editCalcRenderGp(parent.querySelectorAll('li'));
  }
});

elements.gpEditUlPoly.addEventListener('click', (e) => { // deletes a removed gp
  if (e.target.matches('button')) {
    let child = e.target.parentNode;
    let parent = e.target.parentNode.parentNode;
    parent.removeChild(child);
    editCalcRenderGp(parent.querySelectorAll('li'));
  }
});

elements.showUpdateGpPopBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    showUpdatePop();
    createPopCanvasEffect();
  });
})

elements.gpEditNameInput.addEventListener('keypress', (e) => {
  if (e.charCode === 13) {
    popUpdater(e);
  }
});

elements.updateGp.addEventListener('click', popUpdater);

elements.aboutBtn.addEventListener('click', showAbout);

elements.overlay.addEventListener('click', (e) => {
  if (elements.canvas.classList.contains('open')) {
    elements.canvas.classList.remove('open');
    removePopCanvasEffect();
  }
})

elements.modePop.addEventListener('keydown', (e) => {
  let focusable = elements.modePop.querySelectorAll('button, input');
  trapFocus(e, elements.modePop, focusable);
});

elements.savePopup.addEventListener('keydown', (e) => {
  let focusable = elements.savePopup.querySelectorAll('button, input');
  trapFocus(e, elements.savePopup, focusable);
});

elements.updatePopup.addEventListener('keydown', (e) => {
  let focusable = elements.updatePopup.querySelectorAll('button, input');
  trapFocus(e, elements.updatePopup, focusable);
});

elements.canvas.addEventListener('keydown', (e) => {
  let focusable = elements.canvas.querySelectorAll('button, [href]');
  trapFocus(e, elements.canvas, focusable);
});
