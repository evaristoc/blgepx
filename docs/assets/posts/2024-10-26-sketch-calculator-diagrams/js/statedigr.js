let selectors = [
    {'InitCalculatorModalClickUpdateCalculateNewValues':'CalculateNewValues'},
    {'InitCalculatorModalClickEditShowSelectedCells':'ShowSelectedCells'},
    {'InitCalculatorModalSelectCells':'SelectCells'},
    {'InitCalculatorModalClickSaveUpdateDataset':'UpdateDataset'},
    {'InitCalculatorModalClickCancelResetValues':'ResetValues'},
    {'InitCalculatorModalInitCalculatorDatasetPin':'DatasetPin'},
    {'InitCalculatorModalInitCalculatorBuildTable':'BuildTable'},
    {'elem_choice2':'choice2'},
    {'InitCalculatorModalClickUpdateNewContrPin':'NewContrPin'},
    {'InitCalculatorModalClickUpdateNewSplitPin':'NewSplit'}
    ]

    let addEventFunc = (key, value) => {
        let target = document.querySelector(`#${key}`);
        let otherOpac = document.querySelectorAll(`#g57 > :not([id*=${value}])`);
        target.addEventListener("mouseover", ()=>{
        otherOpac.forEach((v,i)=>{v.style.opacity = .3});
        });
        target.addEventListener("mouseleave", ()=>{
        otherOpac.forEach((v,i)=>{v.style.opacity = 1.});
        });
    }

    let eventInit = (selectors) => {
        selectors.forEach((v,i)=>{
        let key = Object.keys(v)[0];
        let value = v[key];
        addEventFunc(key, value);
        })
    }

    eventInit(selectors);