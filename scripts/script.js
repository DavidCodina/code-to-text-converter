/* =============================================================================
                            convertString()
============================================================================= */


function convertString(string){
  let result = string
                 .replace(/</g, "&#60;")
                 .replace(/>/g, "&#62;")
                 .replace(/{/g, "&#123;")
                 .replace(/}/g, "&#125;");

  return result;
}

/* =============================================================================
                            copyResultToClipboard()
============================================================================= */
// https://stackoverflow.com/questions/33855641/copy-output-of-a-javascript-variable-to-the-clipboard

//  Note textarea is used here and NOT input. Why?
//  <input> tag is only single lines so it will disregard returns.
//  For this weneed to use <textarea>.
//  If we paste it into a text file it will be formatted.


function copyResultToClipboard(result){
  const temporary_textarea = document.createElement("textarea");    //  Create a temporary_textarea to inject the result into.
  document.body.appendChild(temporary_textarea);                    //  Add temporary_textarea to the document
  temporary_textarea.setAttribute("id", "temporary_textarea");      //  Set the id property of temporary_textarea
  document.getElementById("temporary_textarea").value = result;     //  Inject the result
  temporary_textarea.select();                                      //  Select temporary_textarea
  temporary_textarea.setSelectionRange(0, 99999);                   //  For mobile devices. See here: https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
  document.execCommand("copy");                                     //  Copy the content from temorary_textarea.
  document.body.removeChild(temporary_textarea);                    //  Remove temporary_textarea as its no longer needed.

  //https://github.com/apvarun/toastify-js
  Toastify({
    text: "Success: The data has been copied to the clipboard.",
    duration: 3000,
    backgroundColor: "#66FF66",
    className: "success-toast",
    stopOnFocus: true, // Prevents dismissing of toast on hover
    close: true
  }).showToast();
}

/* =============================================================================
                            handle_submit()
============================================================================= */


function handle_submit(e){
  e.preventDefault();
  const textarea       = e.target.elements.string;
  const textarea_value = textarea.value.trim();
  const result_pre     = document.getElementById("result-pre");

  if (textarea_value === ''){
    //https://github.com/apvarun/toastify-js
    Toastify({
      text: "Please fill out the form completely.",
      duration: 3000,
      backgroundColor: "#FF355E",
      className: "warning-toast",
      stopOnFocus: true, // Prevents dismissing of toast on hover
      close: true
    }).showToast();
    return; //return early.
  }

  const result = convertString(textarea_value);
  result_pre.textContent = result;

  copyResultToClipboard(result);
  e.target.reset();
}


/* =============================================================================
                              pow()
============================================================================= */


function pow(){
  const pow_img = document.getElementById("pow-img");
  pow_img.classList.add("zoom-in");
  setTimeout(() => { pow_img.classList.remove("zoom-in"); }, 500);
}


/* =============================================================================
                               window.onload
============================================================================= */



window.onload = () => {
  /* ==============================
      Add event listeners
  ============================== */
  //This was done here mainly just to encapsulate them.


  //Submit event listener
  const code_conversion_form = document.getElementById("code-conversion-form");
  code_conversion_form.addEventListener('submit', (e) => { handle_submit(e) });


  //Clear event listener
  const clear_button = document.getElementById("clear-button");
  clear_button.addEventListener('click', () => {
    const result_pre       = document.getElementById("result-pre");
    result_pre.textContent = '';
  });


  //Function Machine event listener
  const function_machine_img = document.getElementById("function-machine-img");
  function_machine_img.addEventListener('click', pow);


  /* ==============================
         Add in transitions
  ============================== */


  setTimeout(() => {
    const pow_img                  = document.getElementById("pow-img");
    pow_img.style.transition       = "transform 0.15s linear";

    const submit_button            = code_conversion_form.querySelector("input[type=submit]");
    submit_button.style.transition = "all 0.15s linear";

    clear_button.style.transition  = "all 0.15s linear";
  }, 500);


  /* ==============================
    Fire a Pow! (because why not?)
  ============================== */


  setTimeout(pow, 1500);
}
